import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser, logout } from '../../redux/userSlice';
import './ManageAccount.scss';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from "../../assets/images/Logo.png";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ManageAccount = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');


  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');


  const [newEmailRequest, setNewEmailRequest] = useState('');
  const [emailOtp, setEmailOtp] = useState('');


  const [passwordForDeletion, setPasswordForDeletion] = useState('');


  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');


  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [showChangeEmailForm, setShowChangeEmailForm] = useState(false);
  const [showDeleteAccountSection, setShowDeleteAccountSection] = useState(false);



  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhoneNumber(user.phoneNumber || '');
    }
  }, [user]);


  const resetMessages = () => {
    setMessage('');
    setMessageType('');
  };


  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    resetMessages();

    try {
      const response = await axios.put(
        '/api/profile/profile',
        { userId: user._id, name, phoneNumber },
        { withCredentials: true }
      );

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        setMessage('Profile updated successfully!');
        setMessageType('success');
      } else {
        setMessage(response.data.message || 'Failed to update profile.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };


  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    resetMessages();


    if (newPassword !== confirmNewPassword) {
      setMessage('New password and confirm password do not match.');
      setMessageType('error');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/profile/profile`, {
           userId: user._id, currentPassword, newPassword },
        { withCredentials: true }
      );

      if (response.data.success) {
        setMessage('Password changed successfully! A confirmation email has been sent.');
        setMessageType('success');

        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setShowChangePasswordForm(false);
      } else {
        setMessage(response.data.message || 'Failed to change password.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };


  const handleRequestEmailChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    resetMessages();

    try {
      const response = await axios.post(`${API_BASE_URL}/api/profile/request-email-change`,
        { userId: user._id, newEmail: newEmailRequest },
        { withCredentials: true }
      );

      if (response.data.success) {
        setMessage(response.data.message);
        setMessageType('success');

      } else {
        setMessage(response.data.message || 'This email is already in use by another account.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error requesting email change:', error);
      setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };


  const handleConfirmEmailChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    resetMessages();

    try {
      const response = await axios.post(`${API_BASE_URL}/api/profile/confirm-email-change`,
        { userId: user._id, otp: emailOtp },
        { withCredentials: true }
      );

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        setMessage('Email address updated successfully!');
        setMessageType('success');

        setNewEmailRequest('');
        setEmailOtp('');
        setShowChangeEmailForm(false);
      } else {
        setMessage(response.data.message || 'Invalid or expired OTP.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error confirming email change:', error);
      setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };


  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    resetMessages();


    if (!window.confirm('Are you absolutely sure you want to delete your account? This action cannot be undone.')) {
        setLoading(false);
        return;
    }

    try {
      const response = await axios.delete( `${API_BASE_URL}/api/profile/account`, 
        { data: { userId: user._id, password: passwordForDeletion }, withCredentials: true } 
      );

      if (response.data.success) {
        dispatch(logout()); 
        setMessage('Your account has been successfully deleted. Redirecting to homepage...');
        setMessageType('success');
        setPasswordForDeletion(''); 
        setShowDeleteAccountSection(false);

        setTimeout(() => {
            navigate('/');
        }, 3000);
      } else {
        setMessage(response.data.message || 'Failed to delete account.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };


  if (!user) {
    return (

      <>
        <div className="app-logo-position"> 
          <Link to="/">
            <img src={logoImage} alt="Culture Cart Logo" />
          </Link>
        </div>
        <h4 className="appname_login">Culture Cart</h4>
        <div className="manage-account-feature-container">
          <p>Please log in to manage your account.</p>
        </div>
      </>
    );
  }

  return (


    <>
      <div className="app-logo-position">
        <Link to="/">
          <img src={logoImage} alt="Culture Cart Logo" />
        </Link>
      </div>
      <h4 className="appname_login">Culture Cart</h4>
      <div className="manage-account-feature-container">
        <h2>Manage Account Details</h2>
        {message && <p className={`message ${messageType}`}>{message}</p>}
        <form onSubmit={handleProfileSubmit} className="manage-account-form">
          <h3>Basic Information</h3>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="current-email">Email (Cannot change directly here):</label>
            <input
              type="email"
              id="current-email"
              value={email}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number (Optional):</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="e.g., 123-456-7890"
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Save Changes'}
          </button>
        </form>

        <div className="additional-options">
          <h3>
            Change Password
            <button onClick={() => setShowChangePasswordForm(!showChangePasswordForm)} className="toggle-button">
              {showChangePasswordForm ? 'Hide' : 'Show'}
            </button>
          </h3>
          {showChangePasswordForm && (
            <form onSubmit={handleChangePasswordSubmit} className="manage-account-form sub-form">
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password:</label>
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">New Password:</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength="6"
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmNewPassword">Confirm New Password:</label>
                <input
                  type="password"
                  id="confirmNewPassword"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" disabled={loading}>
                {loading ? 'Changing...' : 'Change Password'}
              </button>
            </form>
          )}
          <h3>
            Change Email Address
            <button onClick={() => setShowChangeEmailForm(!showChangeEmailForm)} className="toggle-button">
              {showChangeEmailForm ? 'Hide' : 'Show'}
            </button>
          </h3>
          {showChangeEmailForm && (
            <form onSubmit={messageType === 'success' && message.includes('OTP sent') ? handleConfirmEmailChange : handleRequestEmailChange} className="manage-account-form sub-form">
              {!message.includes('OTP sent') ? (
                <div className="form-group">
                  <label htmlFor="newEmailRequest">New Email Address:</label>
                  <input
                    type="email"
                    id="newEmailRequest"
                    value={newEmailRequest}
                    onChange={(e) => setNewEmailRequest(e.target.value)}
                    required
                  />
                  <button type="submit" disabled={loading}>
                    {loading ? 'Sending OTP...' : 'Request Email Change'}
                  </button>
                </div>
              ) : (
                <div className="form-group">
                  <label htmlFor="emailOtp">OTP sent to your new email:</label>
                  <input
                    type="text"
                    id="emailOtp"
                    value={emailOtp}
                    onChange={(e) => setEmailOtp(e.target.value)}
                    required
                    maxLength="6"
                  />
                  <button type="submit" disabled={loading}>
                    {loading ? 'Confirming...' : 'Confirm Email Change'}
                  </button>
                </div>
              )}
            </form>
          )}
          <h3>
            Delete Account
            <button onClick={() => setShowDeleteAccountSection(!showDeleteAccountSection)} className="toggle-button delete-button">
              {showDeleteAccountSection ? 'Hide' : 'Show'}
            </button>
          </h3>
          {showDeleteAccountSection && (
            <form onSubmit={handleDeleteAccount} className="manage-account-form sub-form delete-section">
              <p className="warning-text">
                <span className="bold">WARNING:</span> Deleting your account is permanent and cannot be undone. All your data will be lost.
              </p>
              <div className="form-group">
                <label htmlFor="passwordForDeletion">Enter your password to confirm deletion:</label>
                <input
                  type="password"
                  id="passwordForDeletion"
                  value={passwordForDeletion}
                  onChange={(e) => setPasswordForDeletion(e.target.value)}
                  required
                />
              </div>
              <button type="submit" disabled={loading} className="delete-confirm-button">
                {loading ? 'Deleting...' : 'Confirm Account Deletion'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ManageAccount;
