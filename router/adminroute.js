import express from "express"

import { adminlogout } from "../controller/usercontroller.js"
import {addproduct,updateproduct,deleteproduct,findproduct,uploads} from "../controller/productcontrol.js"
import {getcategory,updatecategory,addcategory,deletecategory} from "../controller/categorycontrol.js"

const router = express()


router.use('/admin',(req,res,next)=>{
    if(req.session.adminId){
        next()
    }
    else{
        res.status(401).json({ message: "Unauthorized" })
}
})
router.delete('/admin/logout',adminlogout)
router.get('/admin/products',findproduct)
router.post('/admin/products',uploads.single('image'),addproduct)
router.put('/admin/products/:id',uploads.single('image'),updateproduct)
router.delete('/admin/products/:id',deleteproduct)

router.get('/admin/categories',getcategory)
router.post('/admin/categories',addcategory)
router.put('/admin/categories/:id',updatecategory)
router.delete('/admin/categoriies/:id',deletecategory)

export default router