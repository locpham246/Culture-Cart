import React, { useState } from "react";
import "./SignIn.scss";
import logoImage from "../../assets/images/Logo.png";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
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
            <a href="/forgot-password">Forgot Password?</a>
          </p>
          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>
        <p className="signup-link">
          <a href="/signup">Create an Account</a>
        </p>
      </div>
    </div>
  );
};

export default SigninPage;
