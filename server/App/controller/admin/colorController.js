const colorModel = require("../../models/colorModel");

let colorController = {
    create: async (req, res) => {
        let {name ,code ,order} = req.body
        console.log(req.body);
        let insertObj = {
            name ,
            code,
            order
        }


        try {
            let checkSameColor = await colorModel.findOne({ name })

            if (checkSameColor) {
                res.send({
                    status: 0,
                    message: "Color error",
                    error: {
                        name: "Color Name Already Exist..."
                    }
                })
            } else {
                let colorRes = await colorModel.create(insertObj)
                let obj = {
                    status: true,
                    massage: "color Added",
                    colorRes
                }
                res.send(obj)
            }
        }
        catch (err) {
            let error = {}

            for (let key in err.errors) {
                error[key] = err.errors[key].message
            }

            res.send({
                status: 0,
                message: "Color error",
                error
            })
        }
    },
    view: async (req, res) => {
        let data = await colorModel.find()
        let obj = {
            status: true,
            massage: "color viewed",
            data
        }
        res.send(obj)
    },
    delete: async (req, res) => {
        let { id } = req.params

        let delRes = await colorModel.deleteOne({ _id: id })
        let obj = {
            status: true,
            massage: "color delete",
            delRes
        }
        res.send(obj)
    },
    put: async (req, res) => {
        let {id} = req.params
      console.log(id)
       let updateRes = await colorModel.updateOne({_id:id},{$set:req.body})

        let obj = {
            status: true,
            massage: "color updated",
            updateRes
        }
        res.send(obj)
    }
}

module.exports = colorController





