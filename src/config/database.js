require("dotenv").config();
const mongoose = require("mongoose");
// connecting to the database

const connectDb = async () => {
    const dbUri = process.env.DB_CONNECTION_STRING 
    try {
        await mongoose.connect(dbUri);
    } catch (err) {
        console.warn("Remote MongoDB connection failed, falling back to local MongoDB...");
        await mongoose.connect("mongodb://127.0.0.1:27017/devTinder");
    }
}

module.exports = connectDb; 

