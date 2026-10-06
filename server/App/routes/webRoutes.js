let express = require("express");
const { userRoutes } = require("./web/authRoute");
const { homeRoute } = require("./web/homeRoute");
let webRoutes = express.Router()

webRoutes.use('/auth',userRoutes)
webRoutes.use('/home',homeRoute)


module.exports = webRoutes