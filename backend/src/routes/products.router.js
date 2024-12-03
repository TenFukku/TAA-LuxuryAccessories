const express = require("express");
const router = express.Router();
const product = require("../controllers/products.controller");
const upload = require("../middleware/multer");
router.get("/", product.getProducts);
router.get("/cate", product.getProductHaveCateType);
router.get("/hot", product.getHotProducts);
router.get("/category/:cate_type_name", product.getProductsByCategoryType);
router.get(
  "/category/:cate_type_name/:cate_name",
  product.getProductsByCategory
);
router.get("/:id", product.getProductById);
router.post("/", product.addProduct);
router.post("/upload", upload.array("image"), product.uploadImage);
router.delete("/:id", product.deleteProduct);
router.get("/cate/:id", product.getProductByIdHaveCate);
router.put("/:id", product.updateProduct);

module.exports = router;
