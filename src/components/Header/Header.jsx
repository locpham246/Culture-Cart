import React, { useState } from "react";
import "./Header.scss";
import SearchIcon from "@mui/icons-material/Search";
import blackLogo from "../../assets/images/blackLogo.webp";
import signinImage from "../../assets/images/SignIn.png";
import signupImage from "../../assets/images/SignUp.png";
import logoImage from "../../assets/images/Logo.png";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="header">
      <nav>
        <div className="logoContainer">
          <a href="/">
            <img src={logoImage} alt="Logo" className="logoImage" />
          </a>
        </div>
        <div className="right">
          <a href="/signin">
            <img src={signinImage} alt="Sign In" />
          </a>
          <a href="/signup">
            <img src={signupImage} alt="Sign Up" />
          </a>
        </div>
      </nav>

      {open && (
        <div className="sideMenu">
          <img src={blackLogo} alt="logo" />
          <div className="innerMenu">
            <a href="/login"><span>Log In</span></a>
            <a href="/signup"><span>Sign Up</span></a>
          </div>
        </div>
      )}

      <div className="headerContent">
        <h4 className="logo">Culture Cart</h4>
        <div className="input">
          <input type="text" placeholder="Search" />
          <SearchIcon className="searchIcon" />
        </div>
      </div>
    </div>
  );
};

export default Header;
