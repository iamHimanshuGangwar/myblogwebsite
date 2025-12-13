import express from "express";
import { register, verifyOTP, login, refreshToken } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);
router.post("/refresh", refreshToken);

export default router;
