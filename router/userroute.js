import express from "express"
import {adduser,login,adminlogin,logout} from "../controller/usercontroller.js"

const route = express.Router()



route.post('/register',adduser)
route.post('/login',login)
route.post('/admin/login',adminlogin)

route.use('/user',(req,res,next)=>{
    if(req.session.userId){
        next()
    }
    else{
        res.status(401).json({ message: "user Unauthorized" })
}
})
route.delete('/user/logout/:id',logout)




export default route