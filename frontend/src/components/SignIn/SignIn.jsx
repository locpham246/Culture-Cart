import React, { useState } from "react";
import "./SignIn.scss";
import logoImage from "../../assets/images/Logo.png";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; 
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";

const API_BASE_URL = import.meta.env.VITE_PROD_BASE_URL ? import.meta.env.VITE_PROD_BASE_URL: import.meta.env.VITE_DEV_BASE_URL || "http://localhost:3000";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  axios.defaults.withCredentials = true;

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signin`, {
        email,
        password,
      });

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        navigate("/");
        alert("Login successful!");
      } else {
        if (response.data.message.includes('not verified') && response.data.userId) {
            alert(response.data.message);
            navigate(`/verify-otp/${response.data.userId}`);
        } else {
            alert(response.data.message || "Invalid credentials.");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message || "An error occurred during login.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="logo-image">
        <Link to="/">
          <img src={logoImage} alt="Logo" />
        </Link>
      </div>
      <div className="login-container">
        <h4 className="appname_login">Culture Cart</h4>

        <form onSubmit={handleLogin}>
          <div className="email-box">
            <label htmlFor="email"></label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              required
            />
          </div>
          <div className="password-box_signin">
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              required
            />
          </div>
          <p className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
          <button type="submit" className="signin-button" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="signup-link">
          <Link to="/signup">Create an Account</Link>
        </p>
      </div>
    </div>
  );
};

export default SigninPage;
