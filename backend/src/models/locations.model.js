const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let LocationsSchema = new Schema({
    loca_pers_name: { type: "string" },
    loca_pers_phone: { type: "string" },
    loca_address: { type: "string", default: "" },
    loca_detail: { type: "string", default: "" },
    is_default: {type: "boolean", default:"false" },
    user_id: { type: Schema.Types.ObjectId, ref: "users" },
});

module.exports = mongoose.model("locations", LocationsSchema);
