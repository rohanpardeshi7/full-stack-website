const mongoose = require("mongoose");
let userSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:[true,"Please Enter Email"]
    },
    password:{
        type:String,
    },
    address:{
        type:String,
    },
    phone:{
        type:String
    },
    image:{
        type:String
    },
    resetToken:{
        type: String,
        default: null
    },
    resetTokenExpire:{
        type: Date,
        default: null
    },
})

let userModel = mongoose.model("user",userSchema)

module.exports = userModel