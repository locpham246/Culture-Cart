import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../SignUp/OTPVerify.scss'; 
import logoImage from "../../assets/images/Logo.png";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const OTPVerify = () => {
    const { userId } = useParams(); 
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); 

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setMessageType('');

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/verifyemail`, { userId, otp });

            if (response.data.success) {
                setMessage(response.data.message + " You can now sign in.");
                setMessageType('success');
                setTimeout(() => {
                    navigate('/signin'); 
                }, 3000);
            } else {
                setMessage(response.data.message || 'OTP verification failed.');
                setMessageType('error');
            }
        } catch (error) {
            console.error('OTP verification error:', error);
            setMessage(error.response?.data?.message || 'An error occurred during OTP verification.');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {a
        setLoading(true);
        setMessage('');
        setMessageType('');

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/sendotp`, { userId });
            if (response.data.success) {
                setMessage(response.data.message);
                setMessageType('success');
            } else {
                setMessage(response.data.message || 'Failed to resend OTP.');
                setMessageType('error');
            }
        } catch (error) {
            console.error('Resend OTP error:', error);
            setMessage(error.response?.data?.message || 'An error occurred while resending OTP.');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="otp-verification-page">
            <div className="logo-image">
                <Link to="/">
                    <img src={logoImage} alt="Logo" />
                </Link>
            </div>
            <div className="otp-container">
                <h4 className="appname_otp">Folk Cart</h4> 
                <h2>Verify Your Email</h2>
                <p>An OTP has been sent to your email address. Please enter it below to verify your account.</p>

                {message && <div className={`message ${messageType}`}>{message}</div>}

                <form onSubmit={handleVerifyOtp}>
                    <div className="otp-box">
                        <label htmlFor="otp"></label>
                        <input
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            required
                            maxLength="6"
                        />
                    </div>
                    <button type="submit" className="verify-button" disabled={loading}>
                        {loading ? "Verifying..." : "Verify Account"}
                    </button>
                    <button type="button" className="resend-otp-button" onClick={handleResendOtp} disabled={loading}>
                        Resend OTP
                    </button>
                </form>
                <p>Already verified? <Link to="/signin">Sign In</Link></p>
            </div>
        </div>
    );
};

export default OTPVerify;
