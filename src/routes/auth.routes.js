import express from "express";
import rateLimiter from "../middlewares/rateLimiter.middleware.js";
const router = express.Router();
import { loginUserController,registerUserController,refreshTokenController,logoutController} from "../controllers/auth.controller.js";
router.post("/register", registerUserController);
router.post("/login",  rateLimiter("ratelimit:login", 5, 60),loginUserController);
router.post("/refresh", refreshTokenController);
router.post("/logout", logoutController);

export default router;