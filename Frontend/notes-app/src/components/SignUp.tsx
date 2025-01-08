"use client";
import { useState } from "react";
import { signup, verifyOtp } from "../services/api";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    try {
      const response = await signup(email);
      setMessage(response.data.message);
      setStep("otp");
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Signup failed");
    }
  };
  const handleVerifyOtp = async () => {
    try {
      const response = await verifyOtp(email, otp);
      alert("Account verified successfully!");
      setMessage(response.data.message);
      window.location.href = "/login";
    } catch (error: any) {
      setMessage(error.response?.data?.message || "OTP verification failed");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Signup</h1>
      {step === "email" && (
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 border rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSignup}
          >
            Send OTP
          </button>
        </div>
      )}
      {step === "otp" && (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            className="p-2 border rounded mb-4"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleVerifyOtp}
          >
            Verify OTP
          </button>
        </div>
      )}
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};
