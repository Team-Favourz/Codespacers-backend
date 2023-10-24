import { Router } from "express";
import { registerUser, userLogIn } from "@/controllers/index";
import { verifyTokenFromCookie } from "@/middlewares/token_verifier";
const router = Router();

router.post("/register", registerUser);
router.post("/login", verifyTokenFromCookie, userLogIn);

export default router;
