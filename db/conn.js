// establishing a connection to the DB

const mongoose = require("mongoose");
require("dotenv").config();
let URI = process.env.DB_URI.toString();
const connectToDB = async () => {
    try {
        const conn = await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Database is connected 🟢");
    } catch (error) {
        console.log("Database is not connected 🔴");
    }
  
};

module.exports = connectToDB;