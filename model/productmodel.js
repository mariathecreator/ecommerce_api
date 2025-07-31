import mongoose from "mongoose";

const schema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    brand:{
        type:String,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },
    created_on:{
        type:Date,
        default:Date.now
    },
    description:String,
    image:String
})

export const product= new mongoose.model('product',schema)