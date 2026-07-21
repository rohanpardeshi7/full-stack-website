const  mongoose = require("mongoose")

let categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"please fill the name"],
        minLength:[2,"Category name must be at least 3 characters long"],
        maxLength:[20,"Category name cannot exceed 20 characters"]
    },
    image:String, //ImageName --> string
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

let categoryModel = mongoose.model("category",categorySchema)

module.exports = categoryModel