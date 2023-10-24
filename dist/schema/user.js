"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponseSchema = exports.UserListSchema = exports.UserSchema = exports.LoginSchema = void 0;
const zod_1 = require("zod");
exports.LoginSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.UserSchema = zod_1.z.object({
    username: zod_1.z.string().min(2).max(30),
    fullname: zod_1.z.string().min(2).max(60),
    password: zod_1.z.string().min(8).max(40),
    email: zod_1.z.string().email(),
});
exports.UserListSchema = zod_1.z.array(exports.UserSchema);
exports.UserResponseSchema = zod_1.z.object({
    data: exports.UserSchema,
    success: zod_1.z.boolean(),
    status: zod_1.z.number(),
    message: zod_1.z.string(),
});
