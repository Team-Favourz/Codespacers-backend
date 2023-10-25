
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { registerUser, userLogIn, logout, createFolder } from "../controllers/index";
import { verifyTokenFromCookie } from "../middlewares/token_verifier";
const router = Router();

router.post("/register", registerUser);
router.post("/login", verifyTokenFromCookie, userLogIn);
router.post("/logout", verifyTokenFromCookie, logout);
router.post("/createfolder", createFolder)

export default router;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */
