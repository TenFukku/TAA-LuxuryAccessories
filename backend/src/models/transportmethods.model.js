const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let TransportmethodsSchema = new Schema({
    tran_name: { type: "string", required: true },
    tran_cost: { type: "decimal", default: 0.0 },
});

module.exports = mongoose.model("transportmethods", TransportmethodsSchema);
