const mongoose = require('mongoose')

let colorSchema = mongoose.Schema( {
    name:{
        type:String,
        required:[true,"please fill the name"],
        minLength:2,
        maxLength:10
    },
    code:{
        type:String,
        required:[true,"fill the color code"],
        minLength:2,
        maxLength:100
    },
    order:{
        type:Number,
        required:[true,"Fill the order"]
    },
    status:{
        type:Boolean,
        default:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

let colorModel = mongoose.model("color",colorSchema)

module.exports=colorModel