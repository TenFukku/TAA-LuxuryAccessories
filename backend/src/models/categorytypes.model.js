const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let CategorytypesSchema = new Schema({
    cate_type_name: { type: "string", require: true },
});

module.exports = mongoose.model("categorytypes", CategorytypesSchema);
