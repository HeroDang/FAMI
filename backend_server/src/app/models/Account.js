const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const Account = new Schema(
    {
        ID: { type: Number, maxLength: 8 },
        username: { type: String, maxLength: 8 },
        password: { type: String, maxLength: 255 },
        fullname: { type: String, maxLength: 255 },
        job: { type: String, maxLength: 255 },
    },
    {
        timestamps: true,
    },
);

//App plugin
Account.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

module.exports = mongoose.model("accounts", Account);
