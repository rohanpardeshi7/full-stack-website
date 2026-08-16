let mongoose = require("mongoose")
let productSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"please fill the name"],
            minLength:[2,"Product name must be at least 3 characters long"],
            maxLength:[100,"Product name cannot exceed 100 characters"]
        },
        parant:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"category"
        },
        subCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "subCategory"
        },
        subSubCategory:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "subSubcategory"
        },
        colors:[
            {
                type: mongoose.Schema.Types.ObjectId,
                 ref: "color"
            }
        ],
        materials:[
            {
                type: mongoose.Schema.Types.ObjectId,
                 ref: "material"
            }
        ],
        productType:{
            type:String,
            // require:[true,"Please  fill product type"],
            // minilength:[2,"Product type must be 2 characters"]
            enum:["Features", "New Arrivals", "On Sale"]
        },
        bestSelling:{
            type:Boolean,
            default:true,
        },
        upSale:{
            type:Boolean,
            default:true
        },
        actualPrice:{
            type:Number,
            required:[true," Please fill the  Product price"]
        },
        salePrice:{
            type:Number
        },
        stock:{
            type:Number,
            required:[true,"Please fill the stock"]
        },
        image:String, //Product Image
        backImage:String, // BackImage
        gallery:[], //gallery image
        description:String,
        date:{
            type:Date,
            default:Date.now
        },
        order:{
            type:Number,
            required:[true,"Please fill the Product order"]
        }
    }
    
)

let productModel = mongoose.model("product",productSchema)

module.exports = productModel