import React from "react";
import "./ProfileInfo.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faWallet, faHistory, faTrophy, faHeadset, faHeart } from "@fortawesome/free-solid-svg-icons";
import logoImage from "../../assets/images/Logo.png";

const ProfileInfo = () => {
  return (
    <div className="profile-info">
      <div className="center-logo">
        <a href="/">
          <img src={logoImage} alt="Logo" />
        </a>
      </div>
      <h4 className="appname_login">Culture Cart</h4>
      <div className="profile-header">
        <img
          className="profile-picture"
          src="https://via.placeholder.com/150" // Replace with a dynamic profile picture URL if needed
          alt="Profile"
        />
        <h2 className="profile-name">Jessica Nguyen</h2>
      </div>
      <div className="profile-options">
        <div className="profile-option">
          <FontAwesomeIcon icon={faUserCircle} />
          <span>Manage Account</span>
        </div>
        <div className="profile-option">
          <FontAwesomeIcon icon={faTrophy} />
          <span>Points/Rewards</span>
        </div>
        <div className="profile-option">
          <FontAwesomeIcon icon={faWallet} />
          <span>Wallet</span>
        </div>
        <div className="profile-option">
          <FontAwesomeIcon icon={faHeart} />
          <span>Favorites</span>
        </div>

        <div className="profile-option">
          <FontAwesomeIcon icon={faHeadset} />
          <span>Customer Support</span>
        </div>
        <div className="profile-option">
          <FontAwesomeIcon icon={faHistory} />
          <span>Order History</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
