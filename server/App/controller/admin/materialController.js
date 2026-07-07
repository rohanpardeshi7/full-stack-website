const materialModel = require("../../models/materialModel");

let materialController = {
    create: async (req, res) => {
        let { name, order } = req.body;
        let insertObj = {
            name,
            order
        };
        try {
            let materialRes = await materialModel.create(insertObj);
            let obj = {
                status: true,
                message: "material added",
                materialRes
            };
            res.send(obj);
        }
        catch (err) {
            console.log("Database Error:", err.message);
            res.send({
                status: 0,
                message: "material error",
                errorDetails: err.message 
            });
        }
    },

    view: async (req, res) => {
        try {
            let data = await materialModel.find();
            let obj = {
                status: true,
                message: "material viewed", // massage -> message
                data
            };
            res.send(obj);
        } catch (err) {
            res.send({ status: false, message: err.message });
        }
    },
    delete: (req, res) => {
        let obj = {
            status: true,
            message: "material delete"
        };
        res.send(obj);
    },
    put: (req, res) => {
        let obj = {
            status: true,
            message: "material updated"
        };
        res.send(obj);
    }
};

module.exports = materialController;