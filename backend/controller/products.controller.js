import Product from "../models/Product.models.js"

export const getProduct = async(req, res) => {
    try {
        const product = await Product.find();
        res.status(200).json(product);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};