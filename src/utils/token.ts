import jwt from "jsonwebtoken";
import "dotenv/config";

export const verifyToken = (token: string) => {
	return jwt.verify(token, `${process.env.APP_SECRET}`);
};

export const signToken = (username: string) => {
	return jwt.sign({ username }, `${process.env.APP_SECRET}`, {
		expiresIn: process.env.EXPIRY_TIME,
	});
};
