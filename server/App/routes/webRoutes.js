let express = require("express");
const { userRoutes } = require("./web/authRoute");
let webRoutes = express.Router()

webRoutes.use('/auth',userRoutes)

module.exports = webRoutes