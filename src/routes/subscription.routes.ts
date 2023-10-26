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

/**
 * @swagger
 * tags:
 *  name: subscription
 *  description: subscription management
 */

/**
 * @swagger
 * /subscription:
 *   post:
 *     summary: Create a new subscription
 *     tags: [subscription]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/subscription'
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/SuccessResponse'
 *        "400":
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 */ 
