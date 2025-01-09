import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { sendOTP } from "../utils/email";
import cron from "node-cron";

export const signup = async (req: Request, res: Response) => {
  const { email, DateOfBirth, name } = req.body;

  if (!email || !name || !DateOfBirth) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (existingUser && !existingUser.isVerified) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      existingUser.otp = otp;
      existingUser.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
      await existingUser.save();

      await sendOTP(email, otp);
      return res
        .status(200)
        .json({ message: "OTP sent again. Verify to activate your account." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const newUser = new User({
      email,
      otp,
      otpExpiry,
      name,
      DateOfBirth,
      isVerified: false,
    });

    await newUser.save();
    await sendOTP(email, otp);

    res.status(201).json({
      message: "User registered. Verify OTP to activate your account.",
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    res
      .status(500)
      .json({ message: "Error during signup", error: errorMessage });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "OTP is required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Account already verified" });
    }

    if (!user.otp || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry && new Date() > user.otpExpiry) {
      return res
        .status(400)
        .json({ message: "OTP has expired. Please sign up again." });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Account verified successfully", token });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    res
      .status(500)
      .json({ message: "Error verifying OTP", error: errorMessage });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.isVerified) {
      return res.status(400).json({ message: "Account not verified" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    await sendOTP(email, otp);

    res.status(200).json({
      message: "OTP sent to your email for login",
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    res
      .status(500)
      .json({ message: "Error during login", error: errorMessage });
  }
};

export const completeLogin = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "OTP is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.otp || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry && new Date() > user.otpExpiry) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    res
      .status(500)
      .json({ message: "Error completing login", error: errorMessage });
  }
};

cron.schedule("0 * * * *", async () => {
  const now = new Date();
  await User.deleteMany({ isVerified: false, otpExpiry: { $lt: now } });
  console.log("Cleaned up expired unverified users");
});
