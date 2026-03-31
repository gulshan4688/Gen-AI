const mongoose = require("mongoose");

const BlackListTokenSchema = new mongoose.Schema({
    token : {
        type : String,
        required : [true, "token is required to be added in blacklist"]
    }
},
{timestamps: true})

const BlackListTokenModel = mongoose.model("BlackListToken", BlackListTokenSchema )

module.exports = BlackListTokenModel;