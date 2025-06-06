import { Store } from '../models/Store.js';

export const createStore = async (req, res) => {
    try {
        const newStore = new Store(req.body);
        await newStore.save();
        res.status(201).json({ success: true, message: 'Store created successfully.', store: newStore });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getStores = async (req, res) => {
    try {
        const { category } = req.query; 
        let query = {};
        if (category) {
            query.category = category; 
        }
        const stores = await Store.find(query); 
        res.status(200).json({ success: true, stores });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const getStoreById = async (req, res) => {
    try {
        const store = await Store.findById(req.params.id);
        if (!store) {
            return res.status(404).json({ success: false, message: 'Store not found.' });
        }
        res.status(200).json({ success: true, store });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateStore = async (req, res) => {
    try {
        const updatedStore = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedStore) {
            return res.status(404).json({ success: false, message: 'Store not found.' });
        }
        res.status(200).json({ success: true, message: 'Store updated successfully.', store: updatedStore });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteStore = async (req, res) => {
    try {
        const deletedStore = await Store.findByIdAndDelete(req.params.id);
        if (!deletedStore) {
            return res.status(404).json({ success: false, message: 'Store not found.' });
        }
        res.status(200).json({ success: true, message: 'Store deleted successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Example for getNearbyStores, requires user location from query params
export const getNearbyStores = async (req, res) => {
    try {
        const { lat, lon, maxDistance } = req.query; // Latitude, Longitude, max distance in meters
        if (!lat || !lon || !maxDistance) {
            return res.status(400).json({ success: false, message: 'Missing lat, lon, or maxDistance query parameters.' });
        }

        const stores = await Store.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(lon), parseFloat(lat)]
                    },
                    $maxDistance: parseInt(maxDistance) // in meters
                }
            }
        });
        res.status(200).json({ success: true, stores });
    } catch (error) {
        console.error("Error fetching nearby stores:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
export const getAllStores = async (req, res) => {
    try {
        const stores = await Store.find({});
        res.status(200).json({ success: true, stores });
    } catch (error) {
        console.error("Error fetching all stores:", error);
        res.status(500).json({ success: false, message: error.message || 'An error occurred while fetching all stores.' });
    }
};