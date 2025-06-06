
import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String }, 
    zip: { type: String },  
    country: { type: String, default: 'United States' },
    isDefault: { type: Boolean, default: false }
}, { _id: true }); 

const PaymentCardSchema = new mongoose.Schema({
    cardHolderName: { type: String, required: true },
    cardNumber: { type: String, required: true },
    expiryMonth: { type: String, required: true },
    expiryYear: { type: String, required: true },
    cvv: { type: String },
    cardType: { type: String }, 
    isDefault: { type: Boolean, default: false }
}, { _id: true });
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: '' }, 
    addresses: [AddressSchema], 
    paymentCards: [PaymentCardSchema],
    phoneNumber: { type: String, default: '' },
    verifyotp: { type: String, default: '' },
    verifyotpexp: { type: String, default: 0 },
    isaccountverified: { type: Boolean, default: false },
    resetotp: { type: String, default: '' },
    resetotpexpr: { type: Number, default: 0 },

    newEmail: { type: String },
    newEmailOtp: { type: String },
    newEmailOtpExp: { type: Number, default: 0 },

}, { timestamps: true }); 

const UserModel = mongoose.models.user || mongoose.model("User", UserSchema);

export { UserModel as User };