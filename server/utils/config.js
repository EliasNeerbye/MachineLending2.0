require("dotenv").config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/machineLendingDB";
const JWT_SECRET = process.env.JWT_SECRET || "my_very_secret_key";

const config = {
    PORT,
    MONGODB_URI,
    JWT_SECRET,
}

module.exports = config;