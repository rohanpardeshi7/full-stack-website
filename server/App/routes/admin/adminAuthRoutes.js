let express = require('express')
const adminController = require('../../controller/admin/adminController')
let adminRoutes = express.Router()

adminRoutes.post("/forgot-password", adminController.forgotPassword);
adminRoutes.post("/verify-otp", adminController.verifyOtp);
adminRoutes.post("/reset-password", adminController.resetPassword);
adminRoutes.post('/login',adminController.login)


module.exports = adminRoutes