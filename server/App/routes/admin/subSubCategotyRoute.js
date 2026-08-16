let express = require("express");
const subSubCategoryRoute = express.Router();
const multer = require("multer");
const subSubCategoryController = require("../../controller/admin/subSubCategoryController");

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // 💡 FIX: Second parameter 'file' kar diya
        cb(null, "uploads/subSubCategory");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

let upload = multer({ storage });

// Parent category fetch karne ke liye
subSubCategoryRoute.get('/parant', subSubCategoryController.parant);

// Parent ID ke basis par SubCategories fetch karne ke liye
subSubCategoryRoute.get('/subCategory/:parantID', subSubCategoryController.subCategory);

// http://localhost:8000/admin/subsubcategory/create
subSubCategoryRoute.post("/create", upload.single('image'), subSubCategoryController.create);


subSubCategoryRoute.get("/view", subSubCategoryController.view);

module.exports = subSubCategoryRoute;