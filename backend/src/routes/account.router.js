const express = require("express");
const router = express.Router();
const account = require("../controllers/account.controller");
// const middlewares = require("../middlewares")

// router.use('/', middlewares.authorize)

// router.get('/information', account.information)
// router.post('/information/addLocal', account.addLocal)
router.put("/update-user/:id", account.updateUser);
router.put("/change-pass/:id", account.changePassword);
router.delete("/delete-bank/:id", account.deleteBank);
router.delete("/delete-address/:id", account.deleteAddress);
router.get("/bank-cards/:id", account.getBankCards);
router.get("/shipping-addresses/:id", account.getAddresses);
router.post("/add-bank/:id", account.addBank);
router.post("/add-address/:id", account.addAddress);
router.put("/edit-address/:id", account.editAddress);
router.put("/address-default/:id", account.setAddressDefault);
router.put("/bank-default/:id", account.setBankCardDefault);
router.get("/orders/:id", account.getOrders);
router.get("/favors/:id", account.getFavors);
router.post("/add-favors", account.addFavors);
router.delete("/del-favors", account.delFavors);
router.get("/user/:id", account.getUser);
router.post("/order", account.addOrder)
// router.get('/account/orders', account.orders)

// router.get('/favor-products', account.favorProducts)
// router.post('/favor-products/add', account.addFavorProducts)
// router.post('/favor-products/del', account.delFavorProducts)

// router.get('/cart', account.cart)
// router.post('/cart/add', account.addCart)
// router.post('/cart/del', account.delCart)

// router.get('/order', account.order)
// router.post('/orderPost', account.orderPost)

// router.post('/orderLocal',account.addLocal)

// router.post('/orderGetIdLocal',account.localGet)

module.exports = router;
