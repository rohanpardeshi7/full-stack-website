let express = require("express");
const adminRoutes = require("./App/routes/adminRoutes");
const dbConnection = require("./App/config/dbConnection");
let cors = require('cors')
require("dotenv").config()
let app = express()

app.use(cors())
app.use(express.json())
app.use("/admin",adminRoutes)


app.listen(process.env.PORT, async ()=>{
    await dbConnection()
})
