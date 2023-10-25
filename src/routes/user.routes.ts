
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { registerUser, userLogIn, logout, createFolder, displayFolderDetails} from "../controllers/index";
import { verifyTokenFromCookie } from "../middlewares/token_verifier";
const router = Router();

router.post("/register", registerUser);
router.post("/login", userLogIn);
router.post("/logout", verifyTokenFromCookie, logout);
router.post("/createfolder", createFolder)
router.get("/displayfolderdetails", displayFolderDetails)

export default router;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */
