const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let CategoriesSchema = new Schema({
    cate_name: { type: "string", require: true },
    cate_type_id: { type: Schema.Types.ObjectId, ref: "categorytypes" },
});

module.exports = mongoose.model("categories", CategoriesSchema);
