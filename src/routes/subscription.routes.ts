import {
	addSubscription,
	getPaginatedSubscriptions,
	getSubscription,
} from "@/controllers/subscription.controller";
import { verifyTokenFromCookie } from "@/middlewares/token_verifier";
import { Router } from "express";

const router = Router();

router.get("/:id", verifyTokenFromCookie, getSubscription);
router.post("/", verifyTokenFromCookie, addSubscription);
router.get("/", verifyTokenFromCookie, getPaginatedSubscriptions);

export default router;
