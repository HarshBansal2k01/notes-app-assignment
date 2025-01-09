import { useState } from "react";
import { signup, verifyOtp } from "../services/api";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import logo from "../assets/logo.svg";
export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    dob: false,
    email: false,
    otp: false,
  });

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
  };
  const handleClickShowOtp = () => {
    setShowOtp(!showOtp);
  };

  const handleSignup = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email || !name || !dob) {
      setMessage("Please fill in all required fields");
      return;
    }
    try {
      const response = await signup(email, name, new Date(dob));
      setMessage(response.data.message);
      setStep("otp");
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Signup failed");
    }
  };

  const handleVerifyOtp = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await verifyOtp(email, otp);
      console.log(response);
      localStorage.setItem("token", response.data.token);
      setMessage(response.data.message);
      window.location.href = "/dashboard";
    } catch (error: any) {
      setMessage(error.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <div className="flex items-center gap-2 mb-6">
        <img src={logo} alt="Logo" className="h-8 w-8" />
        <div className="text-2xl sm:text-lg lg:text-2xl font-bold">HD</div>
      </div>{" "}
      <h1 className="text-3xl font-bold mb-3">Sign Up</h1>
      <p className="text-sm mb-2 text-gray-500">
        Sign up to enjoy the features of HD
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
        <>
          <TextField
            required
            label="Name"
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            onBlur={() => handleBlur("name")}
            disabled={step === "otp"}
            className="w-full sm:w-64 md:w-80 lg:w-96"
            error={touched.name && !name}
            helperText={touched.name && !name ? "Name is required" : ""}
          />
          <TextField
            required
            label="Date of Birth"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            onBlur={() => handleBlur("dob")}
            disabled={step === "otp"}
            className="w-full sm:w-64 md:w-80 lg:w-96"
            InputProps={{ sx: { height: 40 } }}
            InputLabelProps={{ shrink: true }}
            error={touched.dob && !dob}
            helperText={touched.dob && !dob ? "Date of Birth is required" : ""}
          />
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
          <button
            className={`bg-blue-500 text-white w-full sm:w-64 md:w-80 lg:w-96 py-2 mt-3 rounded ${
              step === "email" ? "" : "hover:bg-blue-600"
            }`}
            onClick={step === "email" ? handleSignup : handleVerifyOtp}
          >
            {step === "email" ? "Send OTP" : "Verify OTP"}
          </button>
          <div className="mt-4 text-center">
            <p>
              Already have an account?{" "}
              <Link to="/">
                <span className="text-blue-600  underline">Sign In</span>
              </Link>
            </p>
          </div>
        </>
        {message && (
          <p className="mt-4 text-red-500 text-sm font-medium bg-red-100 p-3 rounded">
            {message}
          </p>
        )}
      </Box>
    </div>
  );
};
