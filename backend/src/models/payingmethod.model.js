const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let PayingmethodSchema = new Schema({
    pay_name: { type: "string", required: true },
});

module.exports = mongoose.model("payingmethod", PayingmethodSchema);
