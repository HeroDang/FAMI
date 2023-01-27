const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const MEForm = new Schema(
    {
        formId: { type: Number },
        numOrder: { type: Number },
        personId: { type: Number },
        patientId: { type: Number },
        date: { type: Date, default: Date.now() },
        reason: { type: String, maxLength: 600 },
        roomIds: { type: Array },
    },
    {
        timestamps: true,
    },
);

//App plugin
MEForm.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

module.exports = mongoose.model("meforms", MEForm);
