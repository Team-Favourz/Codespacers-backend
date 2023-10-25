// custom.d.ts

import type { JwtPayload } from "jsonwebtoken";

declare module "express" {
	interface UserRequest extends Request {
		user: string | JwtPayload;
	}
}
