let express = require('express')
const cartController = require('../../controller/web/cartController')
 let cartRoute = express.Router()


 cartRoute.post('/add-to-cart',cartController.addToCart)

module.exports = {cartRoute}