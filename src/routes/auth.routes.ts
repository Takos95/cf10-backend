import { Router } from "express";
import * as authCtrl from "../controllers/auth.controller";
import { loginSchema } from "../validators/auth.validator";
import { validate } from "../middlewares/validate.middleware";

const router = Router();

/**
 * @openapi
 * /auth/login:
 *  post:
 *    summary: Login a user
 *    tags: [Auth]
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
 *    responses:
 *      200:
 *        description: Returns a JWT token
 *      401:
 *        description: Invalid credentials
 */
router.post("/login", validate(loginSchema), authCtrl.login);

router.post("/google-auth", authCtrl.googleLogin);

export default router;
