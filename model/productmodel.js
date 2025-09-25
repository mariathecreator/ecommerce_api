import mongoose from "mongoose";
import { category } from "./categoriesmodel.js";


const productschema= new mongoose.Schema({
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
        ref:'category',
        required:true
    },
    created_on:{
        type:Date,
        default:Date.now
    },
    updated_on:{
        type:Date
    },
    description:String,
    image:String
},{timestamps:true})

export const product= new mongoose.model('product',productschema)