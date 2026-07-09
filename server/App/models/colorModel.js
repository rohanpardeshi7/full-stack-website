const mongoose = require('mongoose')

let colorSchema = mongoose.Schema( {
    name:{
        type:String,
        required:[true,"please fill the name"],
        minLength:[2,"Color name must be at least 3 characters long"],
        maxLength:[20,"Color name cannot exceed 20 characters"]
    },
    code:{
        type:String,
        required:[true,"fill the color code"],
        minLength:[4,"Color code must be at least 4 characters long"],
        maxLength:[100.,"Color code cannot exceed 100 characters"]
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