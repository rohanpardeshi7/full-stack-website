let express = require('express');
const cartController = require('../../controller/web/cartController');

const cartRoute = express.Router();

cartRoute.post('/add-to-cart', cartController.addToCart);

module.exports = { cartRoute };