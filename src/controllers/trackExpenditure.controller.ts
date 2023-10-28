import type { Request, Response } from "express";
import "dotenv/config";
import { errorResponse, successResponse } from "@/utils/responseHandlers";
import connectToCouchbase from "@/db/connection";
import logger from "@/middlewares/logger";
import { validCryptoUUID } from "@/schema/subscription";

export const trackExpenditure = async (req: Request, res: Response) => {
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
