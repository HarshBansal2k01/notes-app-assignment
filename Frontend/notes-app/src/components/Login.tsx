"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { login, completeLogin } from "../services/api";
const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [message, setMessage] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [touched, setTouched] = useState({
    email: false,
    otp: false,
  });

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
  };
  const handleClickShowOtp = () => {
    setShowOtp(!showOtp);
  };
  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await login(email);
      setMessage(response.data.message);
      setStep("otp");
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  const handleCompleteLogin = async (e: React.MouseEvent) => {
    e.preventDefault();

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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <h1 className="text-2xl font-bold mb-3">Login</h1>
      <p className="text-sm mb-2 text-gray-500">
        Please login to continue to your account
      </p>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& .MuiTextField-root": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
        className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
      >
        <TextField
          required
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleBlur("email")}
          disabled={step === "otp"}
          className="w-full sm:w-64 md:w-80 lg:w-96"
          InputProps={{ sx: { height: 40 } }}
          InputLabelProps={{
            sx: {
              // Adjust the margin for when the label is not focused or filled
              "&.MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
                marginTop: "-5px",
              },
              // Optional: Additional styling for focused state
              "&.Mui-focused": {
                marginTop: "0px", // Adjust as necessary for the focused state
              },
            },
          }}
          error={touched.email && !email}
          helperText={touched.email && !email ? "Email is required" : ""}
        />

        <TextField
          required
          label="OTP"
          type={showOtp ? "text" : "password"}
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          onBlur={() => handleBlur("otp")}
          disabled={step === "email"}
          className="w-full sm:w-64 md:w-80 lg:w-96"
          InputProps={{
            sx: { height: 40 },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle OTP visibility"
                  onClick={handleClickShowOtp}
                  edge="end"
                  disabled={step === "email"}
                >
                  {showOtp ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            sx: {
              // Adjust the margin for when the label is not focused or filled
              "&.MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
                marginTop: "-5px",
              },
              // Optional: Additional styling for focused state
              "&.Mui-focused": {
                marginTop: "0px", // Adjust as necessary for the focused state
              },
            },
          }}
          error={touched.otp && !otp && step !== "email"}
          helperText={
            touched.otp && !otp && step !== "email" ? "OTP is required" : ""
          }
        />
        {/* {step === "email" && (
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
      )} */}

        {/* {step === "otp" && (
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
      )} */}
        <button
          className={`bg-blue-500 text-white w-full sm:w-64 md:w-80 lg:w-96 py-2 mt-3 rounded ${
            step === "email" ? "" : "hover:bg-blue-600"
          }`}
          onClick={step === "email" ? handleLogin : handleCompleteLogin}
        >
          {step === "email" ? "Send OTP" : "Verify OTP"}
        </button>
        {message && (
          <p className="mt-4 text-red-500 text-sm font-medium bg-red-100 p-3 rounded">
            {message}
          </p>
        )}
      </Box>
    </div>
  );
};

export default Login;
