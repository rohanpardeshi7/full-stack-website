const mongoose = require("mongoose");

let dbConnection = async () => {
  try {
   
    const uri = process.env.MONGO_URI ;
    
    await mongoose.connect(uri);
    console.log("Connected to Database successfully!");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};

module.exports = dbConnection;