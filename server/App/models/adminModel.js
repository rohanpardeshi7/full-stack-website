const { default: mongoose } = require("mongoose");

let adminSchema = mongoose.Schema({
    name: String,
    email: String,
    password:String,
    logo:String,
    CompnyName:String,
    officalEmail:String,
    address:String,
    mapURL:String
})

let adminModel = mongoose.model('admin',adminSchema)
module.exports = adminModel