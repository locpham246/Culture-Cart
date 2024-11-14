import React, { useState } from "react";
import "./Header.scss";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search"; 
import blackLogo from "../../assets/images/blackLogo.webp";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="header">

      <nav>
        <div className="right">
          <span>Log in</span>
          <span>Sign up</span>
        </div>
      </nav>

      <div className="hamburger" onClick={() => setOpen(!open)}>
        {open ? <CloseIcon style={{ color: "black" }} /> : <MenuIcon />}
      </div>

      {open && (
        <div className="sideMenu">
          <img src={blackLogo} alt="logo" />
          <div className="innerMenu">

            <span>Log In</span>
            <span>Sign Up</span>
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

