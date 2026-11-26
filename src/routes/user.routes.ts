import { Router } from "express";
import * as userCtrl from "../controllers/user.controller";
import {
  createUserSchema,
  updateUserSchema,
} from "../validators/user.validator";
import { validate } from "../middlewares/validate.middleware";
import { validateEmail } from "../middlewares/validateEmail.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { hasAdminRole } from "../middlewares/user.middleware";

const router = Router();

/**
 * @openapi
 * /users:
 *  get:
 *    summary: Return all users from my mongoDB
 *    tags: [Users]
 *    responses:
 *     200:
 *       description: Returns array of users
 */
router.get("/", userCtrl.getAll);

/**
 * @openapi
 * /users/email/{email}:
 *  get:
 *    summary: Get a user by email from my mongoDB
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: email
 *        required: true
 *        schema:
 *          type: string
 *          format: email
 *    responses:
 *      200:
 *        description: Returns a user
 *      404:
 *        description: User not found
 */
router.get("/email/:email", validateEmail(), userCtrl.getOneByEmail);

/**
 * @openapi
 * /users:
 *  post:
 *    summary: Create a new user
 *    tags: [Users]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *             firstname:
 *               type: string
 *             lastname:
 *               type: string
 *             email:
 *               type: string
 *    responses:
 *      201:
 *        description: User created
 */
router.post(
  "/",
  authenticate,
  hasAdminRole,
  validate(createUserSchema),
  userCtrl.create,
);

/**
 * @openapi
 * /users/{username}:
 *  put:
 *    summary: Update a user
 *    tags: [Users]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: username
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *             firstname:
 *               type: string
 *             lastname:
 *               type: string
 *             email:
 *               type: string
 *    responses:
 *      200:
 *        description: User updated
 */
router.put(
  "/:username",
  authenticate,
  hasAdminRole,
  validate(updateUserSchema),
  userCtrl.update,
);

/**
 * @openapi
 * /users/{username}:
 *  delete:
 *    summary: Delete a user
 *    tags: [Users]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: username
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: User deleted
 *      404:
 *        description: User not found
 */
router.delete("/:username", authenticate, hasAdminRole, userCtrl.remove);

export default router;
