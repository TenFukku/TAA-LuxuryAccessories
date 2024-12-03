const express = require("express");
const router = express.Router();
const cart = require("../controllers/cart.controller");

router.get("/", cart.getCart);
router.post("/getQuantity", cart.getQuantityCartByUserId);
router.post("/get", cart.getCartByUserId);
router.get("/delete", cart.deleteAllProductFromCart);
router.put("/update-quantity", cart.putQuantityToCart)
router.post("/add", cart.addProductToCart);
router.delete("/delete-item/:id", cart.deleteCartItem);

// router.put('/card/:id', card.update)
// router.delete('/card/:id', card.delete)

module.exports = router;
