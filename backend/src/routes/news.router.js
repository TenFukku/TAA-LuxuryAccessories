const express = require("express");
const router = express.Router();
const news = require("../controllers/news.controller");
const upload = require("../middleware/multer");

router.get("/", news.getBlogs);
router.get("/:id", news.getBlogsById);
router.delete("/:id", news.deleteNewsById);
router.put("/:id", news.updateBlog);
router.post("/", news.postBlogs);
router.post("/upload", upload.array("image"), news.uploadImage);
module.exports = router;
