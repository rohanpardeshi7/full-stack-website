const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const path = require("path");
require("dotenv").config();

const adminRoutes = require("./App/routes/adminRoutes");
const webRoutes = require("./App/routes/webRoutes");
const dbConnection = require("./App/config/dbConnection");
const adminModel = require("./App/models/adminModel");

const app = express();
const saltRounds = 10;

// 1. CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 2. Body Parsers (Both JSON & Form Data)
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // <-- Ye line missing thi

// 3. Static Files
app.use("/uploads/category", express.static(path.join(__dirname, "uploads/category")));
app.use("/uploads/subCategory", express.static(path.join(__dirname, "uploads/subCategory")));
app.use("/uploads/subSubCategory", express.static(path.join(__dirname, "uploads/subSubCategory")));
app.use("/uploads/product", express.static(path.join(__dirname, "uploads/product")));

// 4. Routes
app.use("/admin", adminRoutes);
app.use("/web", webRoutes);

// 5. Server Initialization
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    await dbConnection();
    console.log(`🚀 Server running on port ${PORT}`);

    const checkData = await adminModel.findOne();
    if (!checkData) {
      const hash = bcrypt.hashSync(process.env.ADMINPASSWORD, saltRounds);
      await adminModel.create({
        email: process.env.ADMINMAIL,
        password: hash,
      });
      console.log("✅ Default admin created");
    }
  } catch (error) {
    console.error("❌ Connection error:", error.message);
  }
});