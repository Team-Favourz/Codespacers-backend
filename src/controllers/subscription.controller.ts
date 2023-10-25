import type { Request, Response } from "express";
import "dotenv/config";
import { errorResponse, successResponse } from "../utils/responseHandlers";
import connectToCouchbase, { cluster } from "../db/connection";
import logger from "../middlewares/logger";
import { SubscriptionSchema, validCryptoUUID } from "@/schema/subscription";
import crypto from "crypto";
import { env } from "env";

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
	const collection = await connectToCouchbase("subscription");
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
		return errorResponse(res, "Invalid subscription id", 400);
	}

	const collection = await connectToCouchbase("subscription");
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
	_req: Request,
	res: Response,
) => {
	const query = `SELECT id, plan, duration, startDate, amount FROM ${env.DB_BUCKET_NAME}.${env.DB_SCOPE_NAME}.subscription`;
	const result = await cluster.query(query);
	console.log(result.rows);

	logger.info(`All subscriptions fetched successfully`);
	successResponse(
		res,
		{ result: result.rows },
		200,
		"Subscription fetched successfully",
	);
};
