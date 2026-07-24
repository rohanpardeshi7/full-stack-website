const categoryModel = require("../../models/categoryModel")

let categoryController = {
    // ------------------- CREATE CATEGORY -------------------
    create: async (req, res) => {
        let { name, order } = req.body

        let insertobj = {
            name,
            order
        }

        if (req.file && req.file.filename) {
            insertobj['image'] = req.file.filename
        }
        
        try {
            let checkSameCategory = await categoryModel.findOne({ name })
            
            if (checkSameCategory) {
                return res.status(400).json({
                    status: false,
                    message: "Category Error",
                    error: {
                        name: "Category Name Already Exist"
                    }
                })
            } else {
                let categoryRes = await categoryModel.create(insertobj)
                let obj = {
                    status: true,
                    message: "Category Added",
                    categoryRes
                }
                return res.status(200).json(obj)
            }
        } catch (err) {
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
                message: "Category Error",
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

            let data = await categoryModel.find(filter)

            // 💡 Ensure static path always ends with a slash '/'
            let basePath = process.env.CATEGORYSTATICPATH || "http://localhost:8000/uploads/category/";
            if (!basePath.endsWith("/")) {
                basePath += "/";
            }

            let obj = {
                status: true,
                path: basePath,
                message: "Category found", // 💡 Corrected spelling from 'massage'
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
    }
}

module.exports = categoryController;