import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['Admin','User'],
        default:'User'
    },
    status:{
        type:String,
        enum:['Enable','Disable'],
        default:'Enable'
    }
})

export const user = new mongoose.model('user',userSchema)