// frontend/src/components/SignIn/ForgotPassword.jsx

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../assets/images/Logo.png"; 
import "..//SignIn/ForgotPassword.scss"; 

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true; 

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("https://localhost:3000/auth/sendresetotp", { email });

      if (response.data.success) {
        alert(response.data.message);
        setStep(2); 
      } else {
        alert(response.data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Send OTP error:", error);
      alert(error.response?.data?.message || "An error occurred while sending OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!otp || !newPassword || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("https://localhost:3000/auth/resetpassword", {
        email,
        otp,
        newpassword: newPassword, 
      });

      if (response.data.success) {
        alert(response.data.message);
        navigate("/signin");
      } else {
        alert(response.data.message || "Failed to reset password.");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      alert(error.response?.data?.message || "An error occurred while resetting password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="logo-image">
        <Link to="/">
          <img src={logoImage} alt="Logo" />
        </Link>
      </div>
      <div className="forgot-password-container">
        <h4 className="appname_forgot_password">Culture Cart</h4>
        <h2>Forgot Password</h2>

        {step === 1 ? (
          <form onSubmit={handleSendOtp}>
            <p>Please enter your email address to receive an OTP code.</p>
            <div className="input-box">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <button type="submit" className="send-otp-button" disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <p>An OTP has been sent to your email. Please enter it below along with your new password.</p>
            <div className="input-box">
              <label htmlFor="otp">OTP Code</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
              />
            </div>
            <div className="input-box">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
            </div>
            <div className="input-box">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
              />
            </div>
            <button type="submit" className="reset-password-button" disabled={loading}>
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
            <p className="resend-otp-link">
              <span onClick={() => setStep(1)} style={{ cursor: 'pointer', color: '#4D7E29', textDecoration: 'underline' }}>
                Resend OTP or Change Email
              </span>
            </p>
          </form>
        )}
        <p className="back-to-signin">
          Remember your password? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;