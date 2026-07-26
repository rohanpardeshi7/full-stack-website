let express = require("express")
const subCategoryRoute = express.Router()
const multer = require("multer")
const subCategoryController = require("../../controller/admin/subCategoryController")

let storage = multer.diskStorage({
    destination:(req,filename,cb) =>{
        cb(null,"uploads/subCategory")
    },
    filename:(req,file,cb) =>{
        cb(null,Date.now()+file.originalname)
    }
})


    let upload = multer({storage})


//http://localhost:8000/admin/subcategory/create
subCategoryRoute.post("/create",upload.single('image'), subCategoryController.create )


subCategoryRoute.get("/view",subCategoryController.view)

subCategoryRoute.get("/parant",subCategoryController.parant)



// categoryRoute.put("/update")


// categoryRoute.delete("/delete")


module.exports = subCategoryRoute