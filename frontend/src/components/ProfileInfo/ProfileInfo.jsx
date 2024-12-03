import React, { useState } from "react";
import "./ProfileInfo.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faWallet, faHistory, faTrophy, faHeadset, faHeart } from "@fortawesome/free-solid-svg-icons";
import logoImage from "../../assets/images/Logo.png";

const ProfileInfo = () => {
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/150"); // Default profile image URL

  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Set the uploaded image as the profile picture
      };
      reader.readAsDataURL(file); // Convert file to a data URL
    }
  };

  return (
    <div className="profile-info">
      <div className="center-logo">
        <a href="/">
          <img src={logoImage} alt="Logo" />
        </a>
      </div>
      <h4 className="appname_login">Culture Cart</h4>
      <div className="profile-header">
        {/* Profile Picture */}
        <label htmlFor="file-upload" className="profile-picture-wrapper">
          <img
            className="profile-picture"
            src={profileImage} // Use the uploaded image URL or default
            alt="Profile"
          />
        </label>
        <h2 className="profile-name">Jessica Nguyen</h2>
        
        {/* Hidden File Input */}
        <input
          type="file"
          id="file-upload"
          accept="image/*" // Only allow image files
          onChange={handleImageUpload} // Handle file change
          style={{ display: "none" }} // Hide the input field
        />
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
