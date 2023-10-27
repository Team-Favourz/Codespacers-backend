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

/**
 * @swagger
 * /subscription:
 *   get:
 *     summary: Get all subscriptions
 *     tags: [subscription]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/subscription'
 *       responses:
 *          "200":
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/SuccessResponse'
 *          "400":
 *            description: Bad request
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/ErrorResponse'
 *          "401":
 *             description: Unauthorized
 *             content:
 *               application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/ErrorResponse'
 *          "403":
 *            description: Forbidden
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/ErrorResponse'
 *          "500":
 *            description: Internal server error
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/ErrorResponse'
 *
 */

/**
 * @swagger
 * /subscription/{id}:
 *    get:
 *      summary: Get a subscription by id
 *      tags: [subscription]
 *      security:
 *        - cookieAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: The subscription id
 *      schema:
 *        $ref: '#/components/schemas/subscription'
 *      responses:
 *        "200":
 *          description: success
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
 *        "401":
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *        "403":
 *          description: Forbidden
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *        "404":
 *          description: Not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *        "500":
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /subscription/{id}:
 *   patch:
 *     summary: Update a subscription by id
 *     tags: [subscription]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The subscription id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/subscription'
 *     responses:
 *        "200":
 *          description: success
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
 *        "401":
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *        "403":
 *          description: Forbidden
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *        "404":
 *          description: Not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *        "500":
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /subscription/{id}:
 *   delete:
 *     summary: Delete a subscription by id
 *     tags: [subscription]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The subscription id
 *     schema:
 *       $ref: '#/components/schemas/subscription'
 *     responses:
 *        "200":
 *          description: success
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
 *        "401":
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *        "403":
 *          description: Forbidden
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *        "404":
 *          description: Not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *        "500":
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 */
