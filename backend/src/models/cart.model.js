const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let CartSchema = new Schema({
    id: { type: Schema.Types.ObjectId },
    user_id: { type: Schema.Types.ObjectId, ref: "users" },
    prod_id: { type: Schema.Types.ObjectId, ref: "products" },
    quantity: { type: "number", default: 1 },
});

module.exports = mongoose.model("cart", CartSchema);
