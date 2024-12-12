import Product1 from "../models/Product1.models.js";

export const getProduct1 = async (req, res) => {
    try {
        const products = await Product1.find();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching Product1:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getProduct1ById = async (req, res) => {
    const { id } = req.params; 

    try {
        
        const product = await Product1.findOne({ id: parseInt(id) });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching Product1 by ID:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
