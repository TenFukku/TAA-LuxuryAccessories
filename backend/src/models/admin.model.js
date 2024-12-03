const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let AdminSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    admin_username: { type: "string", default: "admin", unique: true , required: true},
    admin_password: { type: "string", default: "admin", required: true},
    admin_name: { type: "string", default: "admin" },
});

module.exports = mongoose.model("admin", AdminSchema);
