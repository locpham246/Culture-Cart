import express from 'express';
import { signup, signin, signout, sendverifyotp, verifyEmail, isAuthenticated, sendresetotp, resetuserpassword, getuserdata } from '../controller/user.js';
import user from '../middleware/user.js';


const router = express.Router();
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);
router.post('/sendotp', sendverifyotp);
router.post('/verifyemail', verifyEmail);
router.post('/isauth', user, isAuthenticated);
router.post('/sendresetotp', sendresetotp);
router.post('/resetpassword', resetuserpassword);
router.get('/userdata', user, getuserdata);


export default router;
