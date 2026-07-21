let express = require("express")
const categoryController = require("../../controller/admin/categoryController")
const categoryRoute = express.Router()
const multer = require("multer")

let storage = multer.diskStorage({
    destination:(req,filename,cb) =>{
        cb(null,"uploads/category")
    },
    filename:(req,file,cb) =>{
        cb(null,Date.now()+file.originalname)
    }
})


    let upload = multer({storage})


//http://localhost:8000/admin/category/create
categoryRoute.post("/create",upload.single('image'), categoryController.create )


categoryRoute.get("/view",categoryController.view)


// categoryRoute.put("/update")


// categoryRoute.delete("/delete")


module.exports = categoryRoute