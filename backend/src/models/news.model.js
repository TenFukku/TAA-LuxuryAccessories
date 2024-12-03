const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let BlogSchema = new Schema({
    b_title: { type: "string" },
    b_date: { type: "string" },
    b_content: { type: "string" },
    b_heading: {
        type: [String], // Đây là một mảng các chuỗi
        required: true,
    },
    b_text: {
        type: [String], // Đây là một mảng các chuỗi
        required: true,
    },
    b_image: {
        type: [String], // Đây là một mảng các chuỗi
        required: true,
    },
    
});

module.exports = mongoose.model("news", BlogSchema);
