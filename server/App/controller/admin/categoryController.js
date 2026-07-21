const categoryModel = require("../../models/categoryModel")

let categoryController = {
    create: async (req, res) => {
        let { name, order } = req.body

        let insertobj = {
            name,
            order
        }

        if (req.file) {
            if (req.file.filename) {
                insertobj['image'] = req.file.filename
            }
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
                message: "category error",
                error: errorObj
            })
        }
    } ,
    view: async (req, res) => {
        try{
            let orCondition = []
            if (req.query.name) {
                orCondition.push({ name: new RegExp(req.query.name, "i") })
            }//name:"red"
            let filter = {}

            if (orCondition.length >= 1) {
                filter.$or = orCondition
            }
            let data = await categoryModel.find(filter)
            let obj = {
                status: true,
                path: process.env.CATEGORYSTATICPATH,
                massage: "Category found",
                data
            }
            res.send(obj)
    } catch(err){
        res.status(500 ).send({
            status: false,
            message: "Internal Server Error",
            error: err.message
        })
    }}

}

module.exports = categoryController;