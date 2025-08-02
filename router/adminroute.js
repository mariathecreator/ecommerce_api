import express from "express"

import { adminlogout, findusers,adminlogin } from "../controller/usercontroller.js"
import {addproduct,updateproduct,deleteproduct,findproduct,uploads} from "../controller/productcontrol.js"
import {getcategory,updatecategory,addcategory,deletecategory} from "../controller/categorycontrol.js"

const router = express()

router.post('/admin/login',adminlogin)

router.use('/admin',(req,res,next)=>{
    if(req.session.adminId){
        next()
    }
    else{
        res.status(401).json({ message: "Unauthorized" })
}
})
router.get('/admin/getusers',findusers)
router.delete('/admin/logout',adminlogout)
router.get('/admin/getproducts',findproduct)
router.post('/admin/addproducts',uploads.single('image'),addproduct)
router.put('/admin/updateproducts/:id',uploads.single('image'),updateproduct)
router.delete('/admin/deleteproducts/:id',deleteproduct)

router.get('/admin/getcategories',getcategory)
router.post('/admin/addcategories',addcategory)
router.put('/admin/updatecategories/:id',updatecategory)
router.delete('/admin/deletecategories/:id',deletecategory)

export default router