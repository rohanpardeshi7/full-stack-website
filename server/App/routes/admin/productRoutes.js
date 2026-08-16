let express = require("express")
let productRoute = express.Router()
const multer = require("multer")
const productController = require("../../controller/admin/productController")

let storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,"uploads/product")
    },
    filename:(req,file,cb) =>{
        cb(null,Date.now()+file.originalname)
    }
})


    let upload = multer({storage})

    productRoute.post('/create',
        upload.fields([
            {
                name: 'image',
                maxCount:1
            },
            {
                name:'backImage',
                maxCount:1
            },
            {
                name:'gallery',
                maxCount:20
            }
        ]), 
        
        
        productController.create )
    productRoute.get('/view', productController.view )
    productRoute.get('/details/:id', productController.details )

    productRoute.get('/parant', productController.parant )
    productRoute.get('/subCategory/:parantID', productController.subCategory )
    productRoute.get('/subSubCategory/:parantID', productController.subSubCategory )
    productRoute.get('/color', productController.color )
    productRoute.get('/material', productController.material )





    module.exports =  productRoute