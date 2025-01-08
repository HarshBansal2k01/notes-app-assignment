"use client";
import { useState } from "react";
import { login, completeLogin } from "../services/api";
const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await login(email);
      setMessage(response.data.message);
      setStep("otp");
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  const handleCompleteLogin = async () => {
    try {
      const response = await completeLogin(email, otp);
      localStorage.setItem("token", response.data.token);
      setMessage("Login successful");
      window.location.href = "/dashboard";
    } catch (error: any) {
      setMessage(error.response?.data?.message || "OTP verification failed");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
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
            onClick={handleLogin}
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
            onClick={handleCompleteLogin}
          >
            Verify OTP
          </button>
        </div>
      )}
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default Login;
