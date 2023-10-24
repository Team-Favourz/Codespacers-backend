"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, `${process.env.APP_SECRET}`);
};
exports.verifyToken = verifyToken;
const signToken = (username) => {
    return jsonwebtoken_1.default.sign({ username }, `${process.env.APP_SECRET}`, {
        expiresIn: process.env.EXPIRY_TIME,
    });
};
exports.signToken = signToken;
