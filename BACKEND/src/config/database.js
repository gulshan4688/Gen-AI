const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected");
    } catch (error) {
        console.log("Error from db.js: ", error.message);
    }
}

module.exports = connectDB;