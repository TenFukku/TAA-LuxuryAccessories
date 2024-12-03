const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let OrderdetailsSchema = new Schema({
    order_id: { type: Schema.Types.ObjectId, ref: "orders" },
    prod_id: { type: Schema.Types.ObjectId, ref: "products" },
    price: { type: "decimal", require: true },
    quantity: { type: "number", default: 1 },
});

module.exports = mongoose.model("orderdetails", OrderdetailsSchema);
