const mongoose = require("mongoose")

let dbConnection = async ()=>{
  await mongoose.connect(`mongodb://localhost:27017/${process.env.DBNAME}`)

}

module.exports=dbConnection