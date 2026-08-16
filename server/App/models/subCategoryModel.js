const  mongoose = require("mongoose")

let subCategorySchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"please fill the name"],
        minLength:[2,"Sub Category name must be at least 3 characters long"],
        maxLength:[20,"Sub Category name cannot exceed 20 characters"]
    },
    parant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category"
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

let subCategoryModel = mongoose.model("subCategory",subCategorySchema)

module.exports = subCategoryModel