let mongoose = require('mongoose')
 let cartSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    productName: String,
    productPrice:Number,
    productimage:String,
    qty:Number,
    productCategory:String
 })

 let cartModel = mongoose.model("cart",cartSchema )

 module.exports = cartModel