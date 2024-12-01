import React, { useState } from "react";
import "./SignIn.scss";
import logoImage from "../../assets/images/Logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; 
import { setUser } from "../../store/userSlice";

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
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      if (response.data.status) {
        const { token, user } = response.data;
        localStorage.setItem("authToken", token); 
        dispatch(setUser({ user, token })); 
        navigate("/"); 
        alert("Login successful!");
      } else {
        alert(response.data.message || "Invalid credentials.");
      }
    } catch (error) {
      console.error(error);
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
          <button type="submit" className="signin-button" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
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
