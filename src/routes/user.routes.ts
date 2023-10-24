import { Router } from "express";
import { registerUser, userLogIn, logout } from "@/controllers/index";
import { verifyTokenFromCookie } from "@/middlewares/token_verifier";
const router = Router();

router.post("/register", registerUser);
router.post("/login", verifyTokenFromCookie, userLogIn);
router.post("/logout", verifyTokenFromCookie, logout);

export default router;
