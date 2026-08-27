let express = require("express")
const authController = require("../../controller/web/authController")
const multer = require("multer")
let  userRoutes = express.Router()


let storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,"uploads/user")
    },
    filename:(req,file,cb) =>{
        cb(null,Date.now()+file.originalname)
    }
})

userRoutes.post("/register",authController.register)
userRoutes.post("/login",authController.login)


//afetr login routes
let upload = multer({storage})
userRoutes.post("/change-Password",authController.changePassword)
userRoutes.post("/update-profile", upload.single('image'), authController.updateProfile)



module.exports={userRoutes}