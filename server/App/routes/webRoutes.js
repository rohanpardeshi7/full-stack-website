let express = require("express");
const { userRoutes } = require("./web/authRoute");
const { homeRoute } = require("./web/homeRoute");
const { cartRoute } = require("./web/cartRoute");
let webRoutes = express.Router()

webRoutes.use('/auth',userRoutes)
webRoutes.use('/home',homeRoute)
webRoutes.use('/cart',cartRoute)



module.exports = webRoutes