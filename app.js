import express from "express"
import session from 'express-session'
import mongoose from "mongoose"
import MongoStore from "connect-mongo"
import route from "./router/userroute.js"
import router from "./router/adminroute.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

await mongoose.connect('mongodb://127.0.0.1:27017/newproject')

app.use(session({
    secret:'secret_key',
    resave:false,
    saveUninitialized:false,
    store:MongoStore.create({mongoUrl:'mongodb://127.0.0.1:27017/newproject'})
}))

app.use(route)
app.use(router)
app.use('/uploads',express.static('uploads'))

app.use((req,res,next)=>{
    res.locals.message=req.session.message
    delete req.session.message
    next()
})


app.listen(3000,()=>{
    console.log('server listening at port:3000');   
})