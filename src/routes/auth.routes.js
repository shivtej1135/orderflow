import express from "express";

const router = express.Router();
import { loginUserController,registerUserController,refreshTokenController,logoutController} from "../controllers/auth.controller.js";
router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.post("/refresh", refreshTokenController);
router.post("/logout", logoutController);

export default router;