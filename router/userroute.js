import express from "express"
import {adduser,updateprofile,getprofile,login,logout} from "../controller/usercontroller.js"
import { addtocart, deleteCartItem, updatecart, viewcart } from "../controller/cartcontroller.js"
import { getcategory } from "../controller/categorycontrol.js"
import { findproduct ,findAProduct} from "../controller/productcontrol.js"
import { addOrder, getOrder, getorderbyid } from "../controller/ordercontrol.js"


const route = express.Router()



route.post('/register',adduser)
route.post('/user/login',login)
route.get('/products',findproduct)
route.get('/products/:id',findAProduct)
route.get('/categories',getcategory)




route.use('/user',(req,res,next)=>{
    if(req.session.userId){
        next()
    }
    else{
        res.status(401).json({ message: "user Unauthorized" })
}
})
route.delete('/user/logout/:id',logout)
route.get('/user/getprofile',getprofile)
route.put('/user/updateprofile',updateprofile)
route.post('/user/addcart/:id',addtocart)
route.put('/user/updatecart/:id',updatecart)
route.get('/user/viewcart',viewcart)
route.delete('/user/deleteitems/:id',deleteCartItem)

route.get('/user/getorder',getOrder)
route.get('/user/getorder/:id',getorderbyid)
route.post('/user/addorder',addOrder)



export default route