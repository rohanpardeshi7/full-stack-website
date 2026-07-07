const mongoose = require('mongoose')

let materialSchema = mongoose.Schema( {
    name:{
        type:String,
        required:[true,"please fill the name"],
        minLangth:2
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

let materialModel = mongoose.model("material",materialSchema)

module.exports=materialModel