const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ProductsSchema = new Schema({
    prod_name: { type: "string", required: true },
    prod_cost: { type: "decimal", required: true },
    // prod_img: { type: "string", required: true },
    prod_img: {
        type: [String], // Đây là một mảng các chuỗi
        required: true,
    },
    prod_discount: { type: "decimal", required: true },
    prod_end_date_discount: { type: "date", required: true },
    prod_num_sold: { type: "number", default: 1 },
    prod_num_avai: { type: "number", default: 50 },
    prod_star_rating: { type: "string", default: 0 },
    prod_description: { type: "string", default: "" },
    cate_id: { type: Schema.Types.ObjectId, ref: "categories" },
    prod_color: { type: "string", required: true },
    prod_size: { type: "string", required: true },
});

module.exports = mongoose.model("products", ProductsSchema);
