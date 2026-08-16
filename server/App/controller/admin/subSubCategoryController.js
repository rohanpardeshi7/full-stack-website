const categoryModel = require("../../models/categoryModel");
const subCategoryModel = require("../../models/subCategoryModel"); 
const subSubCategoryModel = require("../../models/subSubCategoryModel");

let subSubCategoryController = {
    // ------------------- GET PARENT CATEGORIES -------------------
    parant: async (req, res) => {
        try {
            let catRes = await categoryModel.find({ status: true }).select("name");
            return res.status(200).json({
                status: true,
                message: "Category Found",
                data: catRes
            });
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: "Category Error",
                error: err.message
            });
        }
    },

    // ------------------- GET SUB CATEGORIES BY PARENT ID -------------------
    subCategory: async (req, res) => {
        try {
            let { parantID } = req.params;

            let data = await subCategoryModel.find({ parant: parantID, status: true }).select("name")

            return res.status(200).json({
                status: true,
                message: "Sub Category Found",
                data
            });
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: "Sub Category Error",
                error: err.message
            });
        }
    },

    create: async (req, res) => {
        let { name, order, parant, subCategory } = req.body;
    
        let insertobj = {
            name,
            order,
            parant,
            subCategory
        };
    
        if (req.file && req.file.filename) {
            insertobj['image'] = req.file.filename;
        }
    
        try {
            //  Check duplicate ONLY within the same Parent & SubCategory
            let checkSubSubSameCategory = await subSubCategoryModel.findOne({
                parant: parant,
                subCategory: subCategory,
                $or: [
                    { name: name },
                    { order: order }
                ]
            });
    
            if (checkSubSubSameCategory) {
                let errorObj = {};
                if (checkSubSubSameCategory.name === name) {
                    errorObj.name = "Sub Sub Category Name Already Exists in this Sub Category";
                }
                if (checkSubSubSameCategory.order == order) {
                    errorObj.order = "Sub Sub Category Order Already Exists in this Sub Category";
                }
                return res.status(400).json({
                    status: false,
                    message: "Sub Sub Category Error",
                    error: errorObj
                });
            } else {
                let subSubCategoryRes = await subSubCategoryModel.create(insertobj);
                let obj = {
                    status: true,
                    message: "Sub Sub Category Added",
                    subSubCategoryRes
                };
                return res.status(200).json(obj);
            }
        }
        catch (err) {
            let errorObj = {};
    
            if (err.errors) {
                for (let key in err.errors) {
                    errorObj[key] = err.errors[key].message;
                }
            } else {
                errorObj['system'] = err.message;
            }
    
            return res.status(500).json({
                status: false,
                message: "Sub Sub Category Error",
                error: errorObj
            });
        }
    },
    view: async (req,res) =>{
        try {
            let orCondition = []
            if (req.query.name) {
                orCondition.push({ name: new RegExp(req.query.name, "i") })
            }
            
            let filter = {}
            if (orCondition.length >= 1) {
                filter.$or = orCondition
            }

            let data = await subSubCategoryModel.find(filter).populate('parant','name').populate('subCategory','name')

            let basePath = process.env.SUBSUBCATEGORYSTATICPATH || "http://localhost:8000/uploads/subSubCategory/";
            if (!basePath.endsWith("/")) {
                basePath += "/";
            }

            let obj = {
                status: true,
                path: basePath,
                message: "Sub Sub Category found", 
                data
            }
            
            return res.status(200).json(obj)
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: "Internal Server Error",
                error: err.message
            })
        }
    },
    parant: async (req,res) =>{
        let data = await categoryModel.find({status:true}).select("name")
        let obj = {
            status: true,
            data,
            message:"Parant Category Found"
        }
        res.send(obj)
    }

};

module.exports = subSubCategoryController;