import { User } from '../models/User.js';
import bcrypt from 'bcryptjs';
import transporter from '../config/nodemailer.js';

export const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.json({ success: false, message: 'User ID not available. Please log in again.' });
        }
        const user = await User.findById(userId).select('-password -verifyotp -verifyotpexp -resetotp -resetotpexpr -newEmailOtp -newEmailOtpExp');

        if (!user) {
            return res.json({ success: false, message: 'User not found.' });
        }

        return res.json({ success: true, user: user });
    } catch (error) {
        console.error("Get user profile error:", error);
        return res.json({ success: false, message: error.message || 'An error occurred while fetching user profile.' });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { userId, name, avatar, addresses, phoneNumber } = req.body;

        if (!userId) {
            return res.json({ success: false, message: 'Unauthorized.' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found.' });
        }

        if (name !== undefined) user.name = name;
        if (avatar !== undefined) user.avatar = avatar;
        if (addresses !== undefined) user.addresses = addresses;
        if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Your CultureCart Profile Has Been Updated',
            html: `Dear ${user.name},\n\nYour CultureCart profile information has been successfully updated.\n\nIf you did not make this change, please contact our customer support immediately.\n\nThank you,\nCultureCart Team.`
        };
        await transporter.sendMail(mailOptions);

        const updatedUser = await User.findById(userId).select('-password -verifyotp -verifyotpexp -resetotp -resetotexpr -newEmailOtp -newEmailOtpExp');
        return res.json({ success: true, message: 'Profile updated successfully.', user: updatedUser });

    } catch (error) {
        console.error("Update profile error:", error);
        return res.json({ success: false, message: error.message || 'An error occurred while updating profile.' });
    }
};

export const deleteAccount = async (req, res) => {
    try {
        const { userId, password } = req.body; 

        if (!userId || !password) {
            return res.json({ success: false, message: 'Missing user ID or password.' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Incorrect password. Account deletion denied.' });
        }

        await User.findByIdAndDelete(userId);

        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
        });

        return res.json({ success: true, message: 'Your account has been successfully deleted.' });

    } catch (error) {
        console.error("Delete account error:", error);
        return res.json({ success: false, message: error.message || 'An error occurred while deleting your account.' });
    }
};

export const changePassword = async (req, res) => {
    try {
        const { userId, currentPassword, newPassword } = req.body;

        if (!userId || !currentPassword || !newPassword) {
            return res.json({ success: false, message: 'Missing required fields.' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found.' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Current password is incorrect.' });
        }

        user.password = await bcrypt.hash(newPassword, 12);
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Your CultureCart Password Has Been Changed',
            html: `Dear ${user.name},\n\nYour password for CultureCart has been successfully changed.\n\nIf you did not make this change, please contact our customer support immediately.\n\nThank you,\nCultureCart Team.`
        };
        await transporter.sendMail(mailOptions);

        return res.json({ success: true, message: 'Password changed successfully. A confirmation email has been sent.' });

    } catch (error) {
        console.error("Change password error:", error);
        return res.json({ success: false, message: error.message || 'An error occurred while changing password.' });
    }
};

export const requestEmailChange = async (req, res) => {
    const { userId, newEmail } = req.body;
    if (!userId || !newEmail) {
        return res.json({ success: false, message: 'Missing user ID or new email.' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found.' });
        }

        const existingUserWithNewEmail = await User.findOne({ email: newEmail });
        if (existingUserWithNewEmail && String(existingUserWithNewEmail._id) !== String(userId)) {
            return res.json({ success: false, message: 'This email is already in use by another account.' });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.newEmail = newEmail;
        user.newEmailOtp = otp;
        user.newEmailOtpExp = Date.now() + 15 * 60 * 1000;
        await user.save();


        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: newEmail,
            subject: 'Confirm Your New Email for CultureCart',
            html: `Hello ${user.name},\n\nYou have requested to change your email address for your CultureCart account. Please use this OTP to confirm your new email: <strong>${otp}</strong>.\n\nThis OTP is valid for 15 minutes. If you did not request this change, please ignore this email.\n\nThank you,\nCultureCart Team.`
        };
        await transporter.sendMail(mailOptions);

        return res.json({ success: true, message: `OTP sent to ${newEmail} to confirm your new email address.` });

    } catch (error) {
        console.error("Request email change error:", error);
        return res.json({ success: false, message: error.message || 'An error occurred while requesting email change.' });
    }
};

export const confirmEmailChange = async (req, res) => {
    const { userId, otp } = req.body;
    if (!userId || !otp) {
        return res.json({ success: false, message: 'Missing user ID or OTP.' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found.' });
        }

        if (user.newEmailOtp !== otp || !user.newEmail || user.newEmailOtpExp < Date.now()) {
            return res.json({ success: false, message: 'Invalid or expired OTP.' });
        }

        user.email = user.newEmail;
        user.newEmail = undefined;
        user.newEmailOtp = undefined;
        user.newEmailOtpExp = undefined;
        user.isaccountverified = true;
        await user.save();

        const confirmationMailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Your CultureCart Email Address Has Been Updated',
            html: `Hello ${user.name},\n\nYour CultureCart account email address has been successfully updated to ${user.email}.\n\nIf you did not make this change, please contact our customer support immediately.\n\nThank you,\nCultureCart Team.`
        };
        await transporter.sendMail(confirmationMailOptions);

        const updatedUser = await User.findById(userId).select('-password -verifyotp -verifyotpexp -resetotp -resetotpexpr -newEmailOtp -newEmailOtpExp');
        return res.json({ success: true, message: 'Email address updated successfully!', user: updatedUser });

    } catch (error) {
        console.error("Confirm email change error:", error);
        return res.json({ success: false, message: error.message || 'An error occurred during email change confirmation.' });
    }
};

export const uploadAvatar = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.json({ success: false, message: 'Unauthorized.' });
        }

        if (!req.file) {
            return res.json({ success: false, message: 'No file uploaded.' });
        }

        const avatarUrl = `/uploads/avatars/${req.file.filename}`;

        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found.' });
        }
        user.avatar = avatarUrl;
        await user.save();

        const updatedUser = await User.findById(userId).select('-password -verifyotp -verifyotpexp -resetotp -resetotpexpr -newEmailOtp -newEmailOtpExp');
        return res.json({ success: true, message: 'Avatar updated successfully.', user: updatedUser });

    } catch (error) {
        console.error("Upload avatar error:", error);
        return res.json({ success: false, message: error.message || 'An error occurred during avatar upload.' });
    }
};

export const addAddress = async (req, res) => {
    try {
        const { userId, address } = req.body;
        if (!userId || !address) {
            return res.json({ success: false, message: 'Missing user ID or address details.' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found.' });
        }

        if (address.isDefault) {
            user.addresses.forEach(addr => addr.isDefault = false);
        } else if (user.addresses.length === 0) {
            address.isDefault = true;
        }

        user.addresses.push(address);
        await user.save();

        const updatedUser = await User.findById(userId).select('-password -verifyotp -verifyotpexp -resetotp -resetotpexpr -newEmailOtp -newEmailOtpExp');
        return res.json({ success: true, message: 'Address added successfully.', user: updatedUser });

    } catch (error) {
        console.error("Add address error:", error);
        return res.json({ success: false, message: error.message || 'An error occurred while adding address.' });
    }
};

export const updateAddress = async (req, res) => {
    try {
        const { userId, addressId, updatedAddress } = req.body;
        if (!userId || !addressId || !updatedAddress) {
            return res.json({ success: false, message: 'Missing required fields.' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found.' });
        }

        const addressIndex = user.addresses.findIndex(addr => addr._id.toString() === addressId);
        if (addressIndex === -1) {
            return res.json({ success: false, message: 'Address not found.' });
        }

        if (updatedAddress.isDefault) {
            user.addresses.forEach(addr => addr.isDefault = false);
        } else if (user.addresses.length === 1 && addressIndex === 0) {
            if (!updatedAddress.isDefault && user.addresses.length === 1 && addressIndex === 0) {
            }
        }

        user.addresses[addressIndex] = { ...user.addresses[addressIndex].toObject(), ...updatedAddress };

        await user.save();
        const updatedUser = await User.findById(userId).select('-password -verifyotp -verifyotpexp -resetotp -resetotpexpr -newEmailOtp -newEmailOtpExp');
        return res.json({ success: true, message: 'Address updated successfully.', user: updatedUser });

    } catch (error) {
        console.error("Update address error:", error);
        return res.json({ success: false, message: error.message || 'An error occurred while updating address.' });
    }
};

export const deleteAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.body;
        if (!userId || !addressId) {
            return res.json({ success: false, message: 'Missing user ID or address ID.' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found.' });
        }

        const initialAddressCount = user.addresses.length;
        user.addresses = user.addresses.filter(addr => addr._id.toString() !== addressId);

        if (user.addresses.length === initialAddressCount) {
            return res.json({ success: false, message: 'Address not found for this user.' });
        }

        if (user.addresses.length > 0 && !user.addresses.some(addr => addr.isDefault)) {
            user.addresses[0].isDefault = true;
        }

        await user.save();
        const updatedUser = await User.findById(userId).select('-password -verifyotp -verifyotpexp -resetotp -resetotpexpr -newEmailOtp -newEmailOtpExp');
        return res.json({ success: true, message: 'Address deleted successfully.', user: updatedUser });

    } catch (error) {
        console.error("Delete address error:", error);
        return res.json({ success: false, message: error.message || 'An error occurred while deleting address.' });
    }
};

export const addPaymentCard = async (req, res) => {
    try {
        const { userId, card } = req.body;
        console.log("Backend: addPaymentCard - Received userId:", userId);
        console.log("Backend: addPaymentCard - Received card data:", card);

        if (!userId || !card) {
            return res.json({ success: false, message: 'Missing user ID or card details.' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found.' });
        }
        console.log("Backend: addPaymentCard - User found. Current paymentCards before modification:", user.paymentCards);

        if (!user.paymentCards) {
            user.paymentCards = [];
            console.log("Backend: addPaymentCard - Initialized user.paymentCards to empty array.");
        }

        if (card.isDefault) {
            user.paymentCards.forEach(c => c.isDefault = false);
            console.log("Backend: addPaymentCard - Set existing cards to not default.");
        } else if (user.paymentCards.length === 0) {
            card.isDefault = true;
            console.log("Backend: addPaymentCard - Set new card as default (first card).");
        }

        user.paymentCards.push(card);
        console.log("Backend: addPaymentCard - After pushing new card. user.paymentCards:", user.paymentCards);

        await user.save();
        console.log("Backend: addPaymentCard - User saved successfully. User object after save:", user);

        const updatedUser = await User.findById(userId).select('-password -verifyotp -verifyotpexp -resetotp -resetotpexpr -newEmailOtp -newEmailOtpExp');
        console.log("Backend: addPaymentCard - Updated user fetched from DB for response:", updatedUser);

        return res.json({ success: true, message: 'Payment card added successfully.', user: updatedUser });
    } catch (error) {
        console.error("Backend: addPaymentCard error:", error); 
        return res.json({ success: false, message: error.message || 'An error occurred while adding payment card.' });
    }
};
export const updatePaymentCard = async (req, res) => {
    try {
        const { userId, cardId, updatedCard } = req.body;
        if (!userId || !cardId || !updatedCard) {
            return res.json({ success: false, message: 'Missing required fields.' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found.' });
        }

        const cardIndex = user.paymentCards.findIndex(c => c._id.toString() === cardId);
        if (cardIndex === -1) {
            return res.json({ success: false, message: 'Payment card not found.' });
        }

        if (updatedCard.isDefault) {
            user.paymentCards.forEach(c => c.isDefault = false);
        } else if (user.paymentCards.length === 1 && cardIndex === 0) {

            if (!updatedCard.isDefault) {

            }
        }
        user.paymentCards[cardIndex] = { ...user.paymentCards[cardIndex].toObject(), ...updatedCard };

        await user.save();
        const updatedUser = await User.findById(userId).select('-password -verifyotp -verifyotpexp -resetotp -resetotpexpr -newEmailOtp -newEmailOtpExp');
        return res.json({ success: true, message: 'Payment card updated successfully.', user: updatedUser });
    } catch (error) {
        console.error("Update payment card error:", error);
        return res.json({ success: false, message: error.message || 'An error occurred while updating payment card.' });
    }
};

export const deletePaymentCard = async (req, res) => {
    try {
        const { userId, cardId } = req.body;
        if (!userId || !cardId) {
            return res.json({ success: false, message: 'Missing user ID or card ID.' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found.' });
        }

        const initialCardCount = user.paymentCards.length;
        user.paymentCards = user.paymentCards.filter(c => c._id.toString() !== cardId);

        if (user.paymentCards.length === initialCardCount) {
            return res.json({ success: false, message: 'Payment card not found for this user.' });
        }

        if (user.paymentCards.length > 0 && !user.paymentCards.some(c => c.isDefault)) {
            user.paymentCards[0].isDefault = true;
        }

        await user.save();
        const updatedUser = await User.findById(userId).select('-password -verifyotp -verifyotpexp -resetotp -resetotpexpr -newEmailOtp -newEmailOtpExp');
        return res.json({ success: true, message: 'Payment card deleted successfully.', user: updatedUser });
    } catch (error) {
        console.error("Delete payment card error:", error);
        return res.json({ success: false, message: error.message || 'An error occurred while deleting payment card.' });
    }
};