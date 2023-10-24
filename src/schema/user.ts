import { z } from "zod";

export const LoginSchema = z.object({
	username: z.string(),
	password: z.string(),
});

export const UserSchema = z.object({
	username: z.string().min(2).max(30),
	fullname: z.string().min(2).max(60),
	password: z.string().min(8).max(40),
	email: z.string().email(),
});

export type User = z.infer<typeof UserSchema>;

export const UserListSchema = z.array(UserSchema);

export type UserList = z.infer<typeof UserListSchema>;

export const UserResponseSchema = z.object({
	data: UserSchema,
	success: z.boolean(),
	status: z.number(),
	message: z.string(),
});
