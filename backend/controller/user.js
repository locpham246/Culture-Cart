import { User } from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 
import { apiInstance, brevo } from '../config/brevo.js'; 

export const signup = async (req,res) => {
    const { name, email, password, confirm} = req.body;
    if(!name || !email || !password || !confirm){
        return res.json({success: false, message: 'Missing Details'})
    }
    if (password !== confirm) {
        return res.json({ success: false, message: 'Password does not match' });
    }
    try{
        const existing_user = await User.findOne({email})
        if(existing_user){
            return res.json({success: false, message:"User already exists with this email. Please signin to verify your OTP"})
        };
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({name, email, password: hashedPassword, isaccountverified: false, avatar: ''}) 
        await user.save()


        const otp = String(Math.floor( 100000+ Math.random() * 900000));
        user.verifyotp = otp;
        user.verifyotpexp = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();

        const sendSmtpEmail = new brevo.SendSmtpEmail(); 
        sendSmtpEmail.sender = { email: process.env.SENDER_EMAIL, name: 'CultureCart Support' };
        sendSmtpEmail.to = [{ email: email, name: name }];
        sendSmtpEmail.subject = 'Verify Your CultureCart Account - OTP';
        sendSmtpEmail.htmlContent = `
            Hello ${name}, welcome to CultureCart! Please use this OTP code to verify your account: 
            <strong>${otp}</strong>. This OTP is valid for 24 hours.
        `;
        await apiInstance.sendTransacEmail(sendSmtpEmail);

        return res.json({
            success: true,
            message: 'Signup successfully. Please check your email to use OTP that we have sent to verify your account',
            userId: user._id
        })
    }catch(error){
        console.error("Signup error:", error);
        return res.json({success: false, message: error.message || 'An error occurred during signup.'})
    }
}

export const signin = async (req, res)=> {
    const {email, password} = req.body;
    console.log('Backend: Signin function started.'); 
    if(!email || !password){
        return res.json({success: false, message: 'Incorrect Email or Password.'})
    }
    try{
        console.log('Backend: Attempting to find user by email:', email); 
        const user = await User.findOne({ email })

        if(!user){
            return res.json({success: false, message: 'User is not found, please sign up!'})
        }
        console.log('Backend: User found:', user.email); 

        if (!user.isaccountverified) {
            console.log('Backend: User account not verified.'); 
            return res.json({
                success: false,
                message: 'Your account is not verified. Please check your email to verify or resend OTP.',
                userId: user._id
            });
        }
        console.log('Backend: Account is verified.'); 

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            console.log('Backend: Password does not match.');
            return res.json({success: false, message: 'Incorrect password.'})
        }
        console.log('Backend: Password matched. Generating token and setting cookie.');
        const token = jwt.sign({id: user._id}, process.env.JWT_KEY, {expiresIn: '7d'})
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        console.log('Backend: Cookie "token" set successfully with secure:true and sameSite:None'); 
        return res.json({
            success: true,
            message: 'Signin successfully!',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                isaccountverified: user.isaccountverified
            }
        })

    }catch(error){
        console.error("Signin error caught:", error);
        return res.json({success: false, message: error.message || 'An error occurred during signin.'})
    }
}

export const signout = async(req, res) => {
    try{

        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            path: '/'
        });
        return res.json({success: true, message: 'Signed out successfully!'})

    }catch(error){
        console.error("Signout error:", error);
        return res.json({success: false, message: error.message || 'An error occurred during signout.'})
    }
}


export const sendverifyotp = async(req, res) =>{
    try{
        const{userId} = req.body;
        const user = await User.findById(userId)
        if(!user){
            return res.json({success: false, message: 'The user is not found.'})
        }
        if(user.isaccountverified){
            return res.json({success: false, message:"Your account is verified."})
        }
        const otp = String(Math.floor( 100000+ Math.random() * 900000))

        user.verifyotp = otp
        user.verifyotpexp = Date.now() + 24 * 60 * 60 * 1000
        await user.save();

        const sendSmtpEmail = new brevo.SendSmtpEmail(); 
        sendSmtpEmail.sender = { email: process.env.SENDER_EMAIL, name: 'CultureCart Verification' };
        sendSmtpEmail.to = [{ email: user.email, name: user.name }];
        sendSmtpEmail.subject = 'New OTP to verify your account';
        sendSmtpEmail.htmlContent = `
            Your OTP is: <strong>${otp}</strong>. 
            Please use this OTP code to verify your account: <strong>${otp}</strong>. 
            This OTP is valid for 24 hours. Please do not share this code with anyone.
        `;
        await apiInstance.sendTransacEmail(sendSmtpEmail);

        res.json({success: true, message: `OTP has been sent to this email: ${user.email}`})
    }catch(error){
        console.error("Send OTP error:", error);
        return res.json({success: false, message: error.message || 'An error occurred while sending OTP.'})
    }
}

export const verifyEmail = async(req,res) => {
    const{userId, otp} = req.body

    if(!userId || !otp){
        return res.json({success: false, message: 'Missing UserID or OTP.'})
    }
    try{
        const user = await User.findById(userId)

        if(!user){
            return res.json({success: false, message: 'User not found.'})
        }
        if(user.verifyotp === '' || user.verifyotp !== otp){
            return res.json({success: false, message: 'Incorect OTP. Please check your OTP again!'})
        }
        if(Number(user.verifyotpexp) < Date.now()){
            return res.json({success: false, message: 'OTP has expired. Please request a new one.'})
        }
        user.isaccountverified = true;
        user.verifyotp = '';
        user.verifyotpexp = 0;
        await user.save()

        const sendWelcomeEmail = new brevo.SendSmtpEmail(); 
        sendWelcomeEmail.sender = { email: process.env.SENDER_EMAIL, name: 'CultureCart Team' };
        sendWelcomeEmail.to = [{ email: user.email, name: user.name }];
        sendWelcomeEmail.subject = 'Welcome to CultureCart!';
        sendWelcomeEmail.htmlContent = `
            Hello ${user.name},<br><br>Your CultureCart account has been successfully verified! 
            Welcome to our community. You can now log in and start shopping for unique cultural products.<br><br>
            Thank you for joining!<br>CultureCart Team.
        `;
        await apiInstance.sendTransacEmail(sendWelcomeEmail);


        return res.json({success: true, message: 'Email has been successfully verified!'})
    }catch(error){
        console.error("Verify email error:", error);
        return res.json({success: false, message: error.message || 'An error occurred during email verification.'})
    }
}


export const isAuthenticated = async(req,res)=>{
    try{
        if (!req.body.userId) {
            return res.json({ success: false, message: 'User not authenticated.' });
        }
        return res.json({success: true, userId: req.body.userId})
    }catch(error){
        console.error("Is Authenticated error:", error);
        return res.json({success: false, message: error.message || 'An authentication error occurred.'})
    }
}

export const sendresetotp = async(req,res)=>{
    const {email} = req.body
    if(!email){
        return res.json({success: false, message: 'Please enter email.'})
    }
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.json({success: false, message: 'Email not found in the system.'})
        }
        const otp = String(Math.floor( 100000+ Math.random() * 900000))

        user.resetotp = otp
        user.resetotpexpr = Date.now() + 15 * 60 * 1000 
        await user.save();

        const sendResetEmail = new brevo.SendSmtpEmail(); 
        sendResetEmail.sender = { email: process.env.SENDER_EMAIL, name: 'CultureCart Security' };
        sendResetEmail.to = [{ email: user.email, name: user.name }];
        sendResetEmail.subject = 'Password Reset OTP';
        sendResetEmail.htmlContent = 
            `This is your OTP to reset your password: <strong>${otp}</strong>. 
            Please use this code to reset your password! This code is valid for 15 minutes.`;
        await apiInstance.sendTransacEmail(sendResetEmail);


        return res.json({success: true, message: 'Password reset OTP has been sent to your email.'})
    }catch(error){
        console.error("Send reset OTP error:", error);
        return res.json({success: false, message: error.message || 'An error occurred while sending reset OTP.'})
    }
}

export const resetuserpassword = async(req,res)=>{
    const {email, otp, newpassword} = req.body

    if(!email || !otp || !newpassword){
        return res.json({success: false, message: 'Please enter email, OTP, and new password.'})
    }

    try{
        const user = await User.findOne({email})
        if(!user){
            return res.json({success: false, message: 'Email not found.'})
        }
        if(user.resetotp === "" || user.resetotp !== otp){
            return res.json({success: false, message: 'Incorrect OTP.'})
        }

        if(Number(user.resetotpexpr) < Date.now()){
            return res.json({success: false, message: 'OTP has expired. Please request a new one.'})
        }
        const hashedPassword = await bcrypt.hash(newpassword, 12)
        user.password=hashedPassword
        user.resetotp = ''
        user.resetotpexpr = 0

        await user.save()
        return res.json({success: true, message: 'Password has been successfully reset!'})

    }
    catch(error){
        console.error("Reset password error:", error);
        return res.json({success: false, message: error.message || 'An error occurred during password reset.'})
    }
}

export const getuserdata = async (req, res) => {
    try{
        const {userId} = req.body;

        if (!userId) {
            return res.json({success: false, message: 'User ID not available. Please log in again.'});
        }

        const user = await User.findById(userId).select('-password -verifyotp -verifyotpexp -resetotp -resetotpexpr -newEmailOtp -newEmailOtpExp');

        if(!user){
            return res.json({success: false, message: 'User not found.'})
        }

        return res.json({success: true, userData: user})
    }catch(error){
        console.error("Get user data error:", error);
        return res.json({success: false, message: error.message || 'An error occurred while fetching user data.'})
    }
}
