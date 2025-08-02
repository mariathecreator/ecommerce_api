import express from "express"
import {adduser,login,logout} from "../controller/usercontroller.js"
import { addtocart, deleteCartItem, updatecart } from "../controller/cartcontroller.js"
import { getcategory } from "../controller/categorycontrol.js"
import { findproduct } from "../controller/productcontrol.js"

const route = express.Router()



route.post('/register',adduser)
route.post('/login',login)
route.get('/categories',getcategory)
route.get('/products',findproduct)

route.use('/user',(req,res,next)=>{
    if(req.session.userId){
        next()
    }
    else{
        res.status(401).json({ message: "user Unauthorized" })
}
})
route.delete('/user/logout/:id',logout)
route.post('/user/addcart/:id',addtocart)
route.put('/user/updatecart/:id',updatecart)
route.delete('/user/deleteitems/:id',deleteCartItem)



export default route