import type { Request, Response } from "express";
import "dotenv/config";
import { errorResponse, successResponse } from "../utils/responseHandlers";
import connectToCouchbase from "@/db/connection";
import logger from "../middlewares/logger";
import {
	SubscriptionSchema,
	SubscriptionUpdateSchema,
	paginationSchema,
	validCryptoUUID,
} from "@/schema/subscription";
import crypto from "crypto";

export const addSubscription = async (req: Request, res: Response) => {
	// validate the request body first
	const validatedData = await SubscriptionSchema.safeParseAsync(req.body);

	if (!validatedData.success) {
		logger.error(validatedData.error);
		return errorResponse(res, validatedData.error.message, 400);
	}

	// generate a random id
	const id = crypto.randomBytes(16).toString("hex");

	// store the data in the db
	const { collection } = await connectToCouchbase("subscription");
	const sub = {
		id,
		...validatedData.data,
	};
	await collection.insert(id, sub);

	logger.info(`subscription with key ${id} created successfully`);
	successResponse(
		res,
		{ id, ...validatedData.data },
		201,
		"Subscription created successfully",
	);
};

export const getSubscription = async (req: Request, res: Response) => {
	// check that the id is a valid crypto id
	const validatedId = await validCryptoUUID.safeParseAsync(req.params.id);
	if (!validatedId.success) {
		logger.error(`request with id ${req.params.id} failed`);
		return errorResponse(res, "Invalid subscription id", 400);
	}

	const { collection } = await connectToCouchbase("subscription");
	const result = await collection.get(validatedId.data);

	logger.info(`subscription with key ${validatedId.data} fetched successfully`);
	successResponse(
		res,
		{ ...result.content },
		200,
		"Subscription fetched successfully",
	);
};

export const getPaginatedSubscriptions = async (
	req: Request,
	res: Response,
) => {
	// handle pagination
	const validatedParams = await paginationSchema.safeParseAsync({
		page: Number(req.query.page),
		limit: Number(req.query.limit),
	});
	if (!validatedParams.success) {
		logger.error(validatedParams.error);
		return errorResponse(res, validatedParams.error.message, 400);
	}
	const { page, limit } = validatedParams.data;
	const skip = (page - 1) * limit;

	try {
		const query = `SELECT id, plan, duration, startDate, amount FROM subscription LIMIT $limit OFFSET $skip`;
		const options = { parameters: { skip, limit } };
		const { scope } = await connectToCouchbase("subscription");
		const result = await scope.query(query, options);
    const data = {
      page,
      limit,
      hasNext: result.rows.length === limit,
      hasPrevious: page > 1,
      result: result.rows,
    }
		logger.info(`All subscriptions fetched successfully`);
		successResponse(
			res,
      data,
			200,
			"Subscription fetched successfully",
		);
	} catch (err: unknown) {
		logger.error(err);
		return errorResponse(res, "An error occured", 500);
	}
};

export const updateSubscription = async (req: Request, res: Response) => {
	const validatedId = await validCryptoUUID.safeParseAsync(req.params.id);
	if (!validatedId.success) {
		logger.error(`request with id ${req.params.id} failed`);
		return errorResponse(res, "Invalid subscription id", 400);
	}

	// validate the request body first
	const validatedData = await SubscriptionUpdateSchema.safeParseAsync(req.body);
	if (!validatedData.success) {
		logger.error(validatedData.error);
		return errorResponse(res, validatedData.error.message, 400);
	}

	// check that what you want to update exists
	const { collection } = await connectToCouchbase("subscription");
	const result = await collection.get(validatedId.data);

	if (result.content === undefined) {
		logger.error("No subscription found for id " + validatedId.data);
		return errorResponse(res, "Subscription not found", 404);
	}

	// update the data in the db
	const sub = {
		id: validatedId.data,
		...validatedData.data,
		...result.content,
	};
	logger.info(sub);

	const upsertResult = await collection.upsert(validatedId.data, sub);

	logger.info(`subscription with key ${validatedId.data} updated successfully`);
	successResponse(
		res,
		upsertResult.cas,
		200,
		"Subscription updated successfully",
	);
};

export const deleteSubscription = async (req: Request, res: Response) => {
	// all the ids will be in the array

	// validate the id
	const validatedId = await validCryptoUUID.safeParseAsync(req.params.id);
	if (!validatedId.success) {
		logger.error(validatedId.error);
		return errorResponse(res, "Invalid subscription id", 400);
	}

	// check that what you want to delete exists
	const { collection } = await connectToCouchbase("subscription");
	const result = await collection.get(validatedId.data);

	if (result.content === undefined) {
		logger.error("No subscription found for id " + validatedId.data);
		return errorResponse(res, "Subscription not found", 404);
	}

	// delete the data in the db
	const deleteResult = await collection.remove(validatedId.data);

	logger.info(`subscription with key ${validatedId.data} deleted successfully`);

	successResponse(
		res,
		deleteResult.cas,
		200,
		"Subscription deleted successfully",
	);
};
