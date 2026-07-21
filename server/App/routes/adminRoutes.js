    let express = require("express")
const colorRoutes = require("./admin/colorRoutes")
const materialRoutes = require("./admin/materialRoutes")
const categoryRoute = require("./admin/categoryRoutes")

    let adminRoutes = express.Router()

    adminRoutes.use("/color", colorRoutes)
    adminRoutes.use("/material",materialRoutes)
    adminRoutes.use('/category',categoryRoute)



    module.exports=adminRoutes

    