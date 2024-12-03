const Cart = require("../models/cart.model");
const User = require("../models/users.model");
const Products = require("../models/products.model");
const { default: mongoose } = require("mongoose");

const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({});
    console.log("cart", cart);
    // res.cookie('user', true, { maxAge: 900000, httpOnly: true });
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;
    console.log(req.body);

    console.log(user_id, product_id, quantity);

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const product = await Cart.findOne({
      user_id: user_id,
      prod_id: product_id,
    });

    if (product) {
      product.quantity += quantity;
      await product.save();
      return res.status(200).json(product);
    }
    const newProduct = new Cart({
      _id: new mongoose.Types.ObjectId(),
      user_id: user_id,
      prod_id: product_id,
      quantity: quantity,
    });

    await newProduct.save();
    return res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAllProductFromCart = async (req, res) => {
  try {
    const cart = await Cart.deleteMany({});
    res.status(200).json({ message: "All products deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const deleteProductFromCart = async (req, res) => {
//     const { use } = req.body;
//     try {
//         const user = await User.findById(user_id);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         const product = await Cart.findOne({
//             user_id: user_id,
//             prod_id: product_id,
//         });
//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }
//         await product.remove();
//         return res.status(200).json({ message: "Product deleted" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

const getQuantityCartByUserId = async (req, res) => {
    try {
        const { user_id } = req.body;
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const cartList = await Cart.find({ user_id: user_id });
        if (cartList) {
            return res.status(200).json(cartList);
        }  
        else {
            return res.status(200).json([]);
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }

}

const getCartByUserId = async (req, res) => {
  try {
    const { user_id } = req.body;
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const cartList = await Cart.find({ user_id: user_id });

    if (cartList.length > 0) {
      const promises = Promise.all(
        cartList.map(async (item) => {
          const product = await Products.find({
            _id: { $in: item.prod_id },
          });
          return {
            product: product,
            ...item,
          };
        })
      );
      const cartItems = await promises;
      return res.status(200).json(cartItems);
    }

    // cartitem giữu id product
    // const prodList = await Products.find({
    //     _id: { $in: cartList.map((item) => item.prod_id) },

    // });
    // const prodList = await Products.findById({ _id: '65f409cfbd7a13822118748b' });
    // console.log(prodList);
    return res.status(200).json([]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteCartItem = async (req, res, next) => {
  // console.log("delete", req.params);
  const cartId = req.params.id;
  console.log("id", cartId);
  try {
    const cartItem = await Cart.findOne({ _id: cartId });
    console.log("cart", cartItem);
    if (!cartItem) {
      return res.status(404).json({ message: "No such cart Item!" });
    }

    await Cart.findByIdAndDelete(cartId);

    return res.status(200).json({
      message: "Cart item deleted successfully",
    });
  } catch (err) {
    console.error(err);
    return res.error(res);
  }
};
const putQuantityToCart = async (req, res, next) => {
  try {
    const { product_id, user_id, newQuantity } = req.body;

    // Kiểm tra xem product_id, user_id và newQuantity có tồn tại không
    if (!product_id || !user_id || !newQuantity) {
      return res
        .status(400)
        .json({ error: "Missing product_id, user_id, or newQuantity" });
    }

    // Kiểm tra newQuantity có là số không
    if (isNaN(newQuantity)) {
      return res.status(400).json({ error: "newQuantity must be a number" });
    }

    // Kiểm tra newQuantity có lớn hơn 0 không
    if (newQuantity <= 0) {
      return res
        .status(400)
        .json({ error: "newQuantity must be greater than 0" });
    }

    // Tìm giỏ hàng của người dùng chứa sản phẩm cần cập nhật
    let cartItem = await Cart.findOne({ user_id: user_id, prod_id: product_id });

    // Kiểm tra xem sản phẩm có tồn tại trong giỏ hàng không
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    cartItem.quantity = newQuantity;
    await cartItem.save();

    return res.status(200).json({
      message: "Quantity updated successfully",
      updatedCartItem: cartItem,
    });
  } catch (error) {
    console.error("Error updating quantity in cart:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const cart = {
  addProductToCart,
  getCartByUserId,
  getCart,
  getQuantityCartByUserId,
  deleteAllProductFromCart,
  deleteCartItem,
  deleteCartItem,
  putQuantityToCart,
};

module.exports = cart;
