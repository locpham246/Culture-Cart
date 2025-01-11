import Cart from "../models/Cart.model.js";

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id; 

  if (quantity <= 0) {
    return res.status(400).json({ message: "Quantity must be greater than zero" });
  }

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error adding to cart', error: err });
  }
};

export const getCart = async (req, res) => {
  const userId = req.user._id; 

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cart', error: err });
  }
};
