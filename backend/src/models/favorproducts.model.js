const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let FavorproductsSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "users" },
    prod_id: { type: Schema.Types.ObjectId, ref: "products" },
});

module.exports = mongoose.model("favorproducts", FavorproductsSchema);
