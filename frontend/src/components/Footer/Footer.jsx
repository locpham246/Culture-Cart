import React from "react";
import "./Footer.scss";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => {
  return (
    <div className="footer">
      <div className="top">

        <div className="bottom1">
          <div className="bottomContent">
            <h4>ABOUT CULTURE CART</h4>
            <p>Who We Are</p>
            <p>Investor Relations</p>
            <p>Contact Us</p>
          </div>
          <div className="bottomContent">
            <h4>FOR RESTAURANTS</h4>
            <p>Patner with Us</p>
            <p>Apps For you</p>
            <h4>For Enterprises</h4>
          </div>
          <div className="bottomContent">
            <h4>LEARN MORE</h4>
            <p>Privacy</p>
            <p>Security</p>
            <p>Terms</p>
          </div>
          <div className="bottomContent">
            <h4>SOCIAL LINKS</h4>
            <div className="links">
              <LinkedInIcon />
              <TwitterIcon />
              <InstagramIcon />
              <YouTubeIcon />
              <FacebookIcon />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="bottom">
        <p>
          By continuing past this page, you agree to our Terms of Service,
          Cookie Policy, Privacy Policy and Content Policies.
        </p>
      </div>
    </div>
  );
};

export default Footer;
