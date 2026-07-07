let express = require("express")
const materialController = require("../../controller/admin/materialController")
let materialRoutes = express.Router()

//http://localhost:8000/admin/material/create

materialRoutes.post('/create',materialController.create)


//http://localhost:8000/admin/material/view

materialRoutes.get('/view',materialController.view)

//http://localhost:8000/admin/material/delete

materialRoutes.delete('/delete',materialController.delete)

//http://localhost:8000/admin/material/update
materialRoutes.put('/update',materialController.put)


module.exports=materialRoutes