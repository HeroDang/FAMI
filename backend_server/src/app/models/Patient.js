const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const Patient = new Schema(
    {
        id: { type: Number },
        address: { type: String, maxLength: 255 },
        career: { type: String, maxLength: 255 },
        age: { type: Number },
        phone: { type: String, maxLength: 255 },
        name: { type: String, maxLength: 255 },
    },
    {
        timestamps: true,
    },
);

//App plugin
Patient.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

module.exports = mongoose.model("patients", Patient);
