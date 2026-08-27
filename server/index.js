let express = require("express");
const adminRoutes = require("./App/routes/adminRoutes");
const dbConnection = require("./App/config/dbConnection");
let cors = require('cors');
const webRoutes = require("./App/routes/webRoutes");
require("dotenv").config();
let app = express();

app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use("/admin", adminRoutes); // For adminPanal
app.use("/web", webRoutes); // For Website  

app.use("/uploads/category",express.static("uploads/category"))
app.use("/uploads/subCategory",express.static("uploads/subCategory"))
app.use("/uploads/subSubCategory",express.static("uploads/subSubCategory"))
app.use("/uploads/product",express.static("uploads/product"))



app.listen(process.env.PORT, async () => {
    await dbConnection();
    console.log(`🚀 Server running on port ${process.env.PORT}`);
});