import express from "express"

import { adminlogout, findusers,adminlogin, singleUser } from "../controller/usercontroller.js"
import {addproduct,updateproduct,deleteproduct,findproduct,uploads, findproductid} from "../controller/productcontrol.js"
import {getcategory,updatecategory,addcategory,deletecategory, getcategoryid} from "../controller/categorycontrol.js"
import { deleteOrder, getOrder, updateOrder } from "../controller/ordercontrol.js"
import { deleteuser, editUser, userDisable, userEnable } from "../controller/admincontroller.js"

const router =express.Router()

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
router.get('/admin/singleuser/:id',singleUser)
router.delete('/admin/deleteuser/:id',deleteuser)
router.put('/admin/edituser/:id',editUser)
router.put('/admin/userenable/:id',userEnable)
router.put('/admin/userdisable/:id',userDisable)

router.delete('/admin/logout',adminlogout)
router.get('/admin/products',findproduct)
router.get('/admin/products/:id',findproductid)
router.post('/admin/addproducts',uploads.single('image'),addproduct)
router.put('/admin/updateproducts/:id',uploads.single('image'),updateproduct)
router.delete('/admin/deleteproducts/:id',deleteproduct)

router.get('/admin/getcategories',getcategory)
router.get('/admin/getcategories/:id',getcategoryid)
router.post('/admin/addcategories',addcategory)
router.put('/admin/updatecategories/:id',updatecategory)
router.delete('/admin/deletecategories/:id',deletecategory)

router.get('/admin/getorder',getOrder)
router.put('/admin/updateorder/:id',updateOrder)
router.delete('/admin/deleteorder/:id',deleteOrder)


export default router