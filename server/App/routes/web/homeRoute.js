let express = require('express')
const homeController = require('../../controller/web/homeController')
let homeRoute = express.Router()

homeRoute.get("/slider", homeController.slider)
homeRoute.get("/review", homeController.review)
homeRoute.get("/product", homeController.homeProduct)
homeRoute.get("/detail/:slug", homeController.productDetail);

module.exports = {homeRoute}