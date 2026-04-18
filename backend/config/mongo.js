const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://besoraby_db_user:Elfouad!2004@internship-db.ydrka9i.mongodb.net/internship_db?appName=internship-db";

const connectMongo = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectMongo;
