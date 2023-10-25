/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { Request, Response, NextFunction } from "express";
import "dotenv/config";
import { errorResponse } from "../utils/responseHandlers";
import { verifyToken } from "../utils/token";
import type { JwtPayload } from "jsonwebtoken";

export interface UserRequest extends Request {
	user: string | JwtPayload;
}

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
		(req as UserRequest).user = decoded;
		next();
	} catch (err) {
		return errorResponse(res, "Unauthorized", 401);
	}
};
