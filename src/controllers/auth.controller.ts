import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import "dotenv/config";
import { LoginSchema, UserSchema } from "../schema/user";
import { errorResponse, successResponse } from "../utils/responseHandlers";
import connectToCouchbase from "../db/connection";
import logger from "../middlewares/logger";
import { signToken } from "../utils/token";
import { env } from "../env";

export const userLogIn = async (req: Request, res: Response) => {
	// validate the request body first
	const validatedData = await LoginSchema.safeParseAsync(req.body);

	if (!validatedData.success) {
		return errorResponse(res, validatedData.error.message, 400);
	}

	// check the db for the user
	const collection = await connectToCouchbase();
	const usernameExists = await collection.exists(validatedData.data.username);
	if (!usernameExists.exists) {
		errorResponse(res, "Invalid user credentials", 400);
		return;
	}

	const userFound = await collection.get(validatedData.data.username);

	try {
		// Hash the password
		const saltRounds = Number(env.SALT_ROUNDS); // You can adjust this for stronger/weaker hashing
		const hashedPassword = await bcrypt.hash(
			validatedData.data.password,
			saltRounds,
		);
		// Compare the hashed password
		const passwordMatch = await bcrypt.compare(
			validatedData.data.password,
			hashedPassword,
		);

		if (passwordMatch) {
			// Generate a JWT token
			const currentDate = new Date();
			currentDate.setMonth(currentDate.setHours(3));
			const token = signToken(validatedData.data.username);
			res.cookie("cookieToken", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
			});

			const { username, fullname, email } = userFound.content;

			successResponse(res, { username, fullname, email }, 200, "Verified user");
		} else {
			errorResponse(res, "Invalid user, unauthorized", 401);
		}
	} catch (err) {
		logger.error(err);
		errorResponse(res, "Invalid server error", 500);
	}
};

export const registerUser = async (req: Request, res: Response) => {
	try {
		// validate body
		const validatedBody = await UserSchema.safeParseAsync(req.body);

		if (!validatedBody.success) {
			return errorResponse(res, validatedBody.error.message, 400);
		}

		// Check if the user already exists
		const collection = await connectToCouchbase();
		const usernameExists = await collection.exists(validatedBody.data.username);

		if (usernameExists.exists) {
			return errorResponse(res, "Can't create new account", 400);
		}
		const { username, fullname, password, email } = validatedBody.data;

		// Hash the password
		const saltRounds = Number(process.env.SALT_ROUNDS); // You can adjust this for stronger/weaker hashing
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		// Create the user document
		const user = {
			type: "user",
			username,
			fullname,
			password: hashedPassword,
			email,
		};
		const currentDate = new Date();
		currentDate.setMonth(currentDate.setHours(3));

		// create token
		const token = signToken(username);
		res.cookie("cookieToken", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
		});

		// Store the user in the database
		await collection.insert(username, user);

		successResponse(
			res,
			{ username, fullname },
			201,
			"User registered successfully",
		);
	} catch (err) {
		logger.error(err);
		errorResponse(res, "Internal server error", 500);
	}
};

// add forgot password and then otp for password reset
// export const forgotPassword = async (req: Request, res: Response) => {
// 	// validate the request body first
// 	// check the db for the username
// };

export const logout = async (_: Request, res: Response) => {
	// remove the cookies from the header
	res.clearCookie("cookieToken");
	successResponse(res, {}, 200, "User logged out");
};
