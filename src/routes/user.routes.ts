/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { registerUser, userLogIn, logout } from "@/controllers/auth.controller";
import { createFolder, displayFolderDetails } from "../controllers/index";
import { verifyTokenFromCookie } from "../middlewares/token_verifier";
import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
const router = Router();

router.post("/register", limiter, registerUser);
router.post("/login", limiter, userLogIn);
router.post("/logout", verifyTokenFromCookie, logout);

router.post("/createfolder", createFolder);
router.get("/displayfolderdetails", displayFolderDetails);

export default router;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */
