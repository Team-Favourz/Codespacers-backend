/* eslint-disable @typescript-eslint/explicit-function-return-type */
// create token verifier middleware
import type { Request, Response, NextFunction } from "express";
import "dotenv/config";
import { errorResponse } from "@/utils/responseHandlers";
import { verifyToken } from "@/utils/token";

export const verifyTokenFromCookie = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const token = req.cookies.cookieToken;
	if (token === undefined || token === null) {
		return errorResponse(res, "Invalid or Unauthorized token", 401);
	}
	try {
		const decoded = verifyToken(token);
		req.user = decoded;
		next();
	} catch (err) {
		return errorResponse(res, "Unauthorized", 401);
	}
};
