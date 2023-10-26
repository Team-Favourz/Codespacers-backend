import {
	addSubscription,
	deleteSubscription,
	getPaginatedSubscriptions,
	getSubscription,
	updateSubscription,
} from "@/controllers/subscription.controller";
import { verifyTokenFromCookie } from "@/middlewares/token_verifier";
import { Router } from "express";

const router = Router();

router.get("/:id", verifyTokenFromCookie, getSubscription);
router.patch("/:id", verifyTokenFromCookie, updateSubscription);
router.delete("/:id", verifyTokenFromCookie, deleteSubscription);
router.post("/", verifyTokenFromCookie, addSubscription);
router.get("/", verifyTokenFromCookie, getPaginatedSubscriptions);

export default router;
