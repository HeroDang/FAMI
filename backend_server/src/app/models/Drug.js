const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Drug = new Schema(
    {
        drugname: { type: String, maxLength: 255  },
        unit: { type: String, maxLength: 255 },
        unitprice: { type: String, maxLength: 255 },
        quantity: { type: Number },
        amount: { type: Number},
       // status: { type: String, maxLength: 255 },
        total: { type: Number},

    },
    {
        timestamps: true,
    },
);

//App plugin
Drug.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });
Drug.plugin(AutoIncrement, {inc_field: 'drugID'});

module.exports = mongoose.model("drugs", Drug);
