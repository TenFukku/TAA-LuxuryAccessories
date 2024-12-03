const Blog = require("../models/news.model");
// const User = require("../models/users.model");
const cloudinary = require("../utils/cloudinary");

const getBlogs = async (req, res) => {
  try {
    const blog = await Blog.find({});
    console.log(blog);
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBlogsById = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postBlogs = async (req, res) => {
  try {
    // Lấy thông tin từ request body
    const { b_title, b_date, b_content, b_heading, b_text, b_image } = req.body;

    // Tạo một bài viết mới
    const newBlog = new Blog({
      b_title,
      b_date,
      b_content,
      b_heading,
      b_text,
      b_image,
    });

    // Lưu bài viết mới vào cơ sở dữ liệu
    const savedBlog = await newBlog.save();

    // Trả về phản hồi thành công
    res.status(201).json(savedBlog);
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteNewsById = async (req, res) => {
  const newsId = req.params.id;

  try {
    // Tìm và xóa bài viết từ cơ sở dữ liệu
    const deletedNews = await Blog.findByIdAndDelete(newsId);

    if (!deletedNews) {
      // Nếu không tìm thấy bài viết, trả về thông báo lỗi
      return res.status(404).json({ message: "Bài viết không tồn tại" });
    }

    // Trả về thông báo thành công nếu xóa thành công
    res
      .status(200)
      .json({ message: "Bài viết đã được xóa thành công", deletedNews });
  } catch (error) {
    // Nếu có lỗi xảy ra trong quá trình xóa, trả về thông báo lỗi
    console.error("Error deleting news:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi xóa bài viết" });
  }
};

const uploadImage = async (req, res) => {
  try {
    const urls = [];
    const files = req.files;

    // Lặp qua từng file trong files và upload lên Cloudinary
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "news/upload",
      });
      urls.push(result.secure_url);
    }

    // Trả về các URL của các ảnh đã upload
    res.status(200).json({ urls });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { b_title, b_date, b_content, b_heading, b_text, b_image } = req.body;

    const updatedBlogData = {
      b_title,
      b_date,
      b_content,
      b_heading,
      b_text,
      b_image,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedBlogData, { new: true });

    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getBlogs,
  getBlogsById,
  postBlogs,
  deleteNewsById,
  uploadImage,
  updateBlog,
};
