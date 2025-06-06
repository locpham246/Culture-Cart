// frontend/src/models/Store.js

import mongoose from 'mongoose';

const StoreSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    address: { type: String, required: true },
    phoneNumber: { type: String },
    email: { type: String },

    category: {
        type: String,
        enum: ['Asian', 'Hispanic', 'African', 'Other'],
        default: 'Other' 
    },

    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: { 
            type: [Number],
            required: true
        }
    },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    logo: { type: String }, 
}, { timestamps: true });

StoreSchema.index({ location: "2dsphere" });

const StoreModel = mongoose.models.Store || mongoose.model("Store", StoreSchema);

export { StoreModel as Store };