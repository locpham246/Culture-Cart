import ProductModel from "../models/Product.js"; // Product chung


export const createProduct = async (req, res) => {
    try {
        const { name, category, description, weights, images } = req.body;

        if (!name || !category || !description || !images || images.length === 0) {
            return res.status(400).json({ success: false, message: 'Missing required fields for common product.' });
        }

        const newProduct = new ProductModel({
            name,
            category,
            description,
            weights,
            images 
        });

        await newProduct.save();
        res.status(201).json({ success: true, message: 'Common product created successfully.', product: newProduct });

    } catch (error) {
        console.error("Error creating common product:", error);
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
            return res.status(409).json({ success: false, message: 'Product name already exists.' });
        }
        res.status(500).json({ success: false, message: error.message || 'An error occurred while creating the common product.' });
    }
};

// @desc    Get all common products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error("Error fetching common products:", error);
        res.status(500).json({ success: false, message: error.message || 'An error occurred while fetching common products.' });
    }
};

// @desc    Get a common product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Common Product not found.' });
        }
        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error("Error fetching common product by ID:", error);
        res.status(500).json({ success: false, message: error.message || 'An error occurred while fetching the common product.' });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Common Product not found.' });
        }
        res.status(200).json({ success: true, message: 'Common Product updated successfully.', product: updatedProduct });
    } catch (error) {
        console.error("Error updating common product:", error);
        res.status(500).json({ success: false, message: error.message || 'An error occurred while updating the common product.' });
    }
};
export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Common Product not found.' });
        }
        res.status(200).json({ success: true, message: 'Common Product deleted successfully.' });
    } catch (error) {
        console.error("Error deleting common product:", error);
        res.status(500).json({ success: false, message: error.message || 'An error occurred while deleting the common product.' });
    }
};

