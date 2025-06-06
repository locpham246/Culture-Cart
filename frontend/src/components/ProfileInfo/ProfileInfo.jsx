

import React, { useState, useEffect } from "react";
import "./ProfileInfo.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faWallet, faHistory, faTrophy, faHeadset, faHeart } from "@fortawesome/free-solid-svg-icons";
import logoImage from "../../assets/images/Logo.png";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from '../../redux/userSlice';
import { Link } from 'react-router-dom'; 

import defaultAvatarImage from "../../assets/images/default_avatar.png"; 


const ProfileInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

 
  const [profileImage, setProfileImage] = useState(() => {
    if (user && user.avatar) {
      return `${user.avatar}?${Date.now()}`;
    }
    return defaultAvatarImage;
  });

  useEffect(() => {
    if (user && user.avatar) {
      setProfileImage(`${user.avatar}?${Date.now()}`); 
    } else {
      setProfileImage(defaultAvatarImage); 
    }
  }, [user]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file && user && user._id) {
      const formData = new FormData();
      formData.append("avatar", file);
      formData.append("userId", user._id);

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); 
      };
      reader.readAsDataURL(file);

      try {
        const response = await axios.post(
          'https://localhost:3000/api/profile/avatar',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          }
        );

        if (response.data.success) {

          dispatch(setUser(response.data.user)); 
          console.log("Avatar uploaded and profile updated successfully!");
        } else {
          console.error("Failed to upload avatar:", response.data.message);

          setProfileImage(user?.avatar || defaultAvatarImage);
        }
      } catch (error) {
        console.error("Error uploading avatar:", error);
        setProfileImage(user?.avatar || defaultAvatarImage);
      }
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
        <label htmlFor="file-upload" className="profile-picture-wrapper">
          <img
            className="profile-picture"
            src={profileImage}
            alt="Profile"
          />
        </label>
        <h2 className="profile-name">{user ? user.name : "Guest User"}</h2>
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
      </div>
      <div className="profile-options">
        <Link to="/manage-account" className="profile-option">
          <FontAwesomeIcon icon={faUserCircle} />
          <span>Manage Account</span>
        </Link>
        <Link to="/wallet" className="profile-option">
          <FontAwesomeIcon icon={faWallet} />
          <span>Wallet</span>
        </Link>
        <div className="profile-option">
          <FontAwesomeIcon icon={faTrophy} />
          <span>Points/Rewards</span>
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