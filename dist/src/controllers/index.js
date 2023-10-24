"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.registerUser = exports.userLogIn = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv/config");
const user_1 = require("@/schema/user");
const responseHandlers_1 = require("@/utils/responseHandlers");
const connection_1 = __importDefault(require("@/db/connection"));
const logger_1 = __importDefault(require("@/middlewares/logger"));
const token_1 = require("@/utils/token");
const userLogIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // validate the request body first
    const validatedData = yield user_1.LoginSchema.safeParseAsync(req.body);
    if (!validatedData.success) {
        return (0, responseHandlers_1.errorResponse)(res, validatedData.error.message, 400);
    }
    // check the db for the user
    const collection = yield (0, connection_1.default)();
    const usernameExists = yield collection.exists(validatedData.data.username);
    if (!usernameExists.exists) {
        (0, responseHandlers_1.errorResponse)(res, "Invalid user credentials", 400);
        return;
    }
    const userFound = yield collection.get(validatedData.data.username);
    try {
        // Hash the password
        const saltRounds = Number(process.env.SALT_ROUNDS); // You can adjust this for stronger/weaker hashing
        const hashedPassword = yield bcrypt_1.default.hash(validatedData.data.password, saltRounds);
        // Compare the hashed password
        const passwordMatch = yield bcrypt_1.default.compare(validatedData.data.password, hashedPassword);
        if (passwordMatch) {
            // Generate a JWT token
            const currentDate = new Date();
            currentDate.setMonth(currentDate.setHours(3));
            const token = (0, token_1.signToken)(validatedData.data.username);
            res.cookie("cookieToken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });
            const { username, fullname, email } = userFound.content;
            (0, responseHandlers_1.successResponse)(res, { username, fullname, email }, 200, "Verified user");
        }
        else {
            (0, responseHandlers_1.errorResponse)(res, "Invalid user, unauthorized", 401);
        }
    }
    catch (err) {
        logger_1.default.error(err);
        (0, responseHandlers_1.errorResponse)(res, "Invalid server error", 500);
    }
});
exports.userLogIn = userLogIn;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // validate body
        const validatedBody = yield user_1.UserSchema.safeParseAsync(req.body);
        if (!validatedBody.success) {
            return (0, responseHandlers_1.errorResponse)(res, validatedBody.error.message, 400);
        }
        // Check if the user already exists
        const collection = yield (0, connection_1.default)();
        const usernameExists = yield collection.exists(validatedBody.data.username);
        if (usernameExists.exists) {
            return (0, responseHandlers_1.errorResponse)(res, "Can't create new account", 400);
        }
        const { username, fullname, password, email } = validatedBody.data;
        // Hash the password
        const saltRounds = Number(process.env.SALT_ROUNDS); // You can adjust this for stronger/weaker hashing
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
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
        const token = (0, token_1.signToken)(username);
        res.cookie("cookieToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        // Store the user in the database
        yield collection.insert(username, user);
        (0, responseHandlers_1.successResponse)(res, { username, fullname }, 201, "User registered successfully");
    }
    catch (err) {
        logger_1.default.error(err);
        (0, responseHandlers_1.errorResponse)(res, "Internal server error", 500);
    }
});
exports.registerUser = registerUser;
// add forgot password and then otp for password reset
// export const forgotPassword = async (req: Request, res: Response) => {
// 	// validate the request body first
// 	// check the db for the username
// };
const logout = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    // remove the cookies from the header
    res.clearCookie("cookieToken");
    (0, responseHandlers_1.successResponse)(res, {}, 200, "User logged out");
});
exports.logout = logout;
