const categoryModel = require("../../models/categoryModel")
const subCategoryModel = require("../../models/subCategoryModel")

let subCategoryController = {
    // ------------------- CREATE CATEGORY -------------------
    create: async (req, res) => {
        let { name, order, parant } = req.body

        let insertobj = {
            name,
            order,
            parant
        }

        if (req.file && req.file.filename) {
            insertobj['image'] = req.file.filename
        }
        
        try {
            let checkSubSameCategory = await subCategoryModel.findOne({
                $or : [
                    {name:name},
                    {order:order}
                ]
            })

            if(checkSubSameCategory){
                let errorObj = {}
                if(checkSubSameCategory.name === name){
                    errorObj.name = "Sub Category Name Already Exist";
                }
                if(checkSubSameCategory.order == order){
                    errorObj.order = "Sub Category Order Number Already Exist";
                }
                return res.status(400).json({
                    status: false,
                    message: "Sub Category Error",
                    error: errorObj
                });
            } else {
                let subCategoryRes = await subCategoryModel.create(insertobj)
                let obj = {
                    status : true,
                    message: "Sub Category Added",
                    subCategoryRes
                }
                return res.status(200).json(obj)
            }
        }
         catch (err) {
            let errorObj = {} 
            
            if (err.errors) {
                for (let key in err.errors) {
                    errorObj[key] = err.errors[key].message
                }
            } else {
                errorObj['system'] = err.message
            }

            return res.status(500).json({
                status: false,
                message: "Sub Category Error",
                error: errorObj
            })
        }
    },

    // ------------------- VIEW CATEGORIES -------------------
    view: async (req, res) => {
        try {
            let orCondition = []
            if (req.query.name) {
                orCondition.push({ name: new RegExp(req.query.name, "i") })
            }
            
            let filter = {}
            if (orCondition.length >= 1) {
                filter.$or = orCondition
            }

            let data = await subCategoryModel.find(filter).populate('parant','name')

            // 💡 Ensure static path always ends with a slash '/'
            let basePath = process.env.SUBCATEGORYSTATICPATH || "http://localhost:8000/uploads/subCategory/";
            if (!basePath.endsWith("/")) {
                basePath += "/";
            }

            let obj = {
                status: true,
                path: basePath,
                message: "Sub Category found", 
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
}

module.exports = subCategoryController;