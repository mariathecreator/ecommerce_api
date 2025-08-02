import mongoose from "mongoose";

const orderschema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    items:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'product'
        },
        quantity:{
            type:Number,
            default:1
        },
        subtotal:{
            type:Number,
            default:0
        }
    }],
    total:{
        type:Number,
        default:0
    },
    order_status:{
        type:String,
        enum:['pending','ordered'],
        default:'pendiing'
    },
    delivery_status:{
        type:String,
        enum:['pending','completed'],
        default:'pending'
    }
})