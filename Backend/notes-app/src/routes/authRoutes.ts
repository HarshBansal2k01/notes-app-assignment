import express from "express";
import { signup, verifyOtp, login,completeLogin } from "../controllers/authController";

const router = express.Router();

router.post("/signup", signup);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.post("/complete-login", completeLogin); 
export default router;
