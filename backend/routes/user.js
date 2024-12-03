import express from 'express';
import bcrypt from 'bcryptjs';
const router = express.Router();
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
// import nodemailer from 'nodemailer';

router.post('/signup', async (req, res) => {
    const { email, password, confirm } = req.body;

    if (!email || !password || !confirm) {
        return res.status(400).json({ message: "All fields are required." });
    }

    if (password !== confirm) {
        return res.status(400).json({ message: "Passwords do not match." });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword
        });

        await newUser.save();
        return res.status(201).json({ status: true, message: "User registered successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
});

// Sigin Auth
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ message: "User is not registered" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.json({ message: "Password is incorrect" });
    }

    const token = jwt.sign({ email: user.email }, process.env.Key, { expiresIn: '1 hour' });
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); 
    return res.json({ status: true, message: "Login successful", token });
});

// // Forgot Password

// router.post('/forgot-password', async (req, res) => {
//     const {email} = req.body;
//     try {
//         const user = await User.findOne({email})
//         if(!user){
//             return res.json({message:"User has not been registered"})
//         }
//         const token = jwt.sign({ id: user.id }, process.env.Key, { expiresIn: '5m' });
//         var transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//               user: 'youremail@gmail.com',
//               pass: 'yourpassword'
//             }
//           });
          
//           var mailOptions = {
//             from: 'locpham246@gmail.com',
//             to: 'myfriend@yahoo.com',
//             subject: 'Reset Password',
//             text: 'http://localhost:3000/reset/${token}'
//           };
          
//           transporter.sendMail(mailOptions, function(error, info){
//             if (error) {
//               return res.json({message: "Error sending Email"});
//             } else {
//                 return res.json({status: true, message: "Email has been sent"});
//             }
//           });
//     } catch (err) {
//         console.log(err)
//     }
// });

export { router as UserRouter };
