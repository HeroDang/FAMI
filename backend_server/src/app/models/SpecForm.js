const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const SpecForm = new Schema(
    {
        formId: {type: Number},
        roomId: {type: Number},
        personId: {type: Number},
        patientId: {type: Number},
        request: {type: String, maxLength: 600},
        overResult: {type: String, maxLength: 600}
    },
    {
        timestamps: true,
    },
);

//App plugin
SpecForm.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });
SpecForm.plugin(AutoIncrement, {inc_field: 'specFormId'});

module.exports = mongoose.model("specForms", SpecForm);
