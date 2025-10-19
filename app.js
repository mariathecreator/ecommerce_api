import express from "express"
import session from 'express-session'
import mongoose from "mongoose"
import MongoStore from "connect-mongo"
import route from "./router/userroute.js"
import router from "./router/adminroute.js"
import cors  from "cors"
import dotenv from 'dotenv'

dotenv.config()

console.log(process.env.PORT);

const app = express()

// const allowedOrigins =process.env.CORS_URI.split(",")

// app.use(cors({
//   origin:(origin,callback)=>{
//     if(!origin || allowedOrigins.includes(origin)){
//       callback(null,true)
//     }
//     else{
//       callback(new Error("not allowed by  cors"))
//     }
//   },
//   credentials: true,
//   methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS']
// }));

app.use(express.json())
app.use(express.urlencoded({extended:true}))

await mongoose.connect(process.env.MONGO_URI)

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    store:MongoStore.create({mongoUrl:process.env.MONGO_URI}),
  cookie: {
    httpOnly: true,      // prevents JS access
    secure: false,       // true only if you use HTTPS
    sameSite: "lax",     // allow cookies to work cross-origin in dev
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }

}))

app.use('/api',route)
app.use('/api',router)
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

app.listen(process.env.PORT,()=>{
    console.log(`server listening at port:${process.env.PORT}`);   
})

