let express = require("express")
const colorController = require("../../controller/admin/colorController")
let colorRoutes = express.Router()

//http://localhost:8000/admin/color/create

colorRoutes.post('/create',colorController.create)

//http://localhost:8000/admin/color/view

colorRoutes.get('/view',colorController.view)

//http://localhost:8000/admin/color/details

colorRoutes.get('/details/:id',colorController.details)

//http://localhost:8000/admin/color/delete

colorRoutes.delete('/delete/:id',colorController.delete)

//http://localhost:8000/admin/color/multidelete

colorRoutes.post('/multidelete/',colorController.multiDelete)

//http://localhost:8000/admin/color/changestatus

colorRoutes.post('/changestatus/',colorController.changestatus)



//http://localhost:8000/admin/color/update
colorRoutes.put('/update/:id',colorController.put)
  module.exports=colorRoutes