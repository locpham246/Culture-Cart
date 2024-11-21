import React, { useState } from "react";
import "./SignUp.scss";
import logoImage from "../../assets/images/Logo.png";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirm);
    // Add authentication logic here
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
          <div className="password-box_signup">
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
          <div className="confirm-password-box">
            <label htmlFor="confirm-password"></label>
            <input
              type="password"  // Changed from confirm-password to password
              id="confirm-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm Password"
              required
            />
          </div>
          <button type="submit" className="signup-button">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
