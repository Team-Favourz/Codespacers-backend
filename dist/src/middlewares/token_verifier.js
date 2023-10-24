"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenFromCookie = void 0;
require("dotenv/config");
const responseHandlers_1 = require("@/utils/responseHandlers");
const token_1 = require("@/utils/token");
const verifyTokenFromCookie = (req, res, next) => {
    const token = req.cookies.cookieToken;
    if (token === undefined || token === null) {
        return (0, responseHandlers_1.errorResponse)(res, "Invalid or Unauthorized token", 401);
    }
    try {
        const decoded = (0, token_1.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch (err) {
        return (0, responseHandlers_1.errorResponse)(res, "Unauthorized", 401);
    }
};
exports.verifyTokenFromCookie = verifyTokenFromCookie;
