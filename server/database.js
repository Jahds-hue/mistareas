require("dotenv").config();
const mongoose = require("mongoose");

let client;

const connectToMongoDB = async () => {
  try {
    client = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB Atlas with Mongoose");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

const getConnectedClient = () => client;

module.exports = { connectToMongoDB, getConnectedClient };

