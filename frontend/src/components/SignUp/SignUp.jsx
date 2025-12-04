import React, { useState } from "react";
import "./SignUp.scss";
import axios from "axios";
import logoImage from "../../assets/images/Logo.png";
import { useNavigate, Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_PROD_BASE_URL ? import.meta.env.VITE_PROD_BASE_URL: import.meta.env.VITE_DEV_BASE_URL || "http://localhost:3000";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [fullname, setFullname] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSignup = (e) => { 
    e.preventDefault();

    if (!validateEmail(email)) {
      alert("Invalid email!");
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match!"); 
      return;
    }

    setLoading(true);
    axios
      .post(`${API_BASE_URL}/auth/signup`, { name: fullname, email, password, confirm })
      .then((response) => {
        if (response.data.success) { 
          alert(response.data.message); 
          navigate(`/verify-otp/${response.data.userId}`);
        } else {
          alert(response.data.message || "Something went wrong."); 
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.message || "An error occurred during sign up."); 
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="login-page">
      <div className="logo-image">
        <a href="/">
          <img src={logoImage} alt="Logo" />
        </a>
      </div>
      <div className="login-container">
        <h4 className="appname_login">Culture Cart</h4>

        <form onSubmit={handleSignup}>
          <div className="fullname-box">
            <label htmlFor="fullname"></label>
            <input
              type="text"
              id="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Enter Full Name" 
              required
            />
          </div>

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

          <div className="password-box_signup">
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password" 
              required
              minLength="6"
            />
          </div>

          <div className="confirm-password-box">
            <label htmlFor="confirm-password"></label>
            <input
              type="password"
              id="confirm-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm Password" 
              required
            />
          </div>

          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? "Signing up..." : "Create Account"} 
          </button>

          <p>Have an Account? <Link to="/signin">Sign In</Link></p> 
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
