import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:String
})

export const category = new mongoose.model('category',schema)