"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("@/controllers/index");
const token_verifier_1 = require("@/middlewares/token_verifier");
const router = (0, express_1.Router)();
router.post("/register", index_1.registerUser);
router.post("/login", token_verifier_1.verifyTokenFromCookie, index_1.userLogIn);
router.post("/logout", token_verifier_1.verifyTokenFromCookie, index_1.logout);
exports.default = router;
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */
