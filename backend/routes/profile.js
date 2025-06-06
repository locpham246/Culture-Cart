import express from 'express';
import user from '../middleware/user.js';
import {getUserProfile,updateProfile,changePassword, requestEmailChange, confirmEmailChange, uploadAvatar, addAddress, updateAddress, deleteAddress, addPaymentCard, updatePaymentCard, deletePaymentCard, deleteAccount} from '../controller/profile.js';

import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads', 'avatars'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get('/profile', user, getUserProfile);
router.put('/profile', user, updateProfile); 
router.put('/password', user, changePassword);
router.post('/request-email-change', user, requestEmailChange);
router.post('/confirm-email-change', user, confirmEmailChange);
router.post('/avatar', user, upload.single('avatar'), uploadAvatar);
router.post('/address', user, addAddress);
router.put('/address', user, updateAddress);
router.delete('/address', user, deleteAddress);
router.delete('/account', user, deleteAccount); 

router.post('/payment-card', user, addPaymentCard);
router.put('/payment-card', user, updatePaymentCard);
router.delete('/payment-card', user, deletePaymentCard);

export default router;