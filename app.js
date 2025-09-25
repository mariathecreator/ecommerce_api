import express from "express"
import session from 'express-session'
import mongoose from "mongoose"
import MongoStore from "connect-mongo"
import route from "./router/userroute.js"
import router from "./router/adminroute.js"
import cors  from "cors"

const app = express()
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

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

//page not found
// app.all("*", (req, res, next) => {
//   const error = new Error(`Route ${req.originalUrl} not found`);
//   error.status = 404;
//   next(error);
// });
 
// //  Global error handler (must be the last middleware)
// app.use((err, req, res, next) => {
//   console.error("Error:", err.message);

//   res.status(err.status || 500).json({
//     success: false,
//     message: err.message || "Internal Server Error",
//   });
// });

app.listen(3000,()=>{
    console.log('server listening at port:3000');   
})

