    let express = require("express")
const colorRoutes = require("./admin/colorRoutes")
const materialRoutes = require("./admin/materialRoutes")

    let adminRoutes = express.Router()

    adminRoutes.use("/color", colorRoutes)
    adminRoutes.use("/material",materialRoutes)



    module.exports=adminRoutes

    