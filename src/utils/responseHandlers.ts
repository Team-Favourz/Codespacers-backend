import type { Response } from "express";

// create a success response handler
export function successResponse<T>(
	res: Response,
	data: T,
	status = 200,
	message: string,
): Record<string, any> {
	return res.status(status).json({
		message,
		status,
		success: true,
		data,
	});
}

// create an error response handler
export function errorResponse(
	res: Response,
	message: string,
	status = 500,
): Record<string, any> {
	return res.status(status).json({
		message,
		status,
		success: false,
	});
}
