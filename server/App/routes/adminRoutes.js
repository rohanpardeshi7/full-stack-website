let express = require("express");
const colorRoutes = require("./admin/colorRoutes");
const materialRoutes = require("./admin/materialRoutes");
const categoryRoute = require("./admin/categoryRoutes");
const subCategoryRoute = require("./admin/subCategoryRoutes");
const productRoute = require("./admin/productRoutes");
const adminController = require("../controller/admin/adminController");

let adminRoutes = express.Router();

// 1. Auth & Password Routes
adminRoutes.post("/login", adminController.login);
adminRoutes.post("/forgot-password", adminController.forgotPassword);
adminRoutes.post("/verify-otp", adminController.verifyOtp);
adminRoutes.post("/reset-password", adminController.resetPassword);

// 2. Admin Sub-routes
adminRoutes.use("/color", colorRoutes);
adminRoutes.use("/material", materialRoutes);
adminRoutes.use("/category", categoryRoute);
adminRoutes.use("/subcategory", subCategoryRoute);
adminRoutes.use("/subSubCategory", subCategoryRoute);
adminRoutes.use("/product", productRoute);

module.exports = adminRoutes;