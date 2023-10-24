import type { JwtPayload } from "jsonwebtoken";
import type { Request } from "express";

declare module "express" {
	interface UserRequest extends Request {
		user: string | JwtPayload;
	}
}
