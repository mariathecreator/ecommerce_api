import mongoose from "mongoose";

const orderschema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    items:[{
        // product:{
        //     type:mongoose.Schema.Types.ObjectId,
        //     required:true,
        //     ref:'product'
        // },
        productname:{
            type:String
        },
        price:{
            type:Number
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
    
    orderDate:{
         type: Date, 
         default: Date.now 
        },
    delivery_status:{
        type:String,
        enum:['pending','shipped','delivered','cancelled'],
       default:'pending'
    }
})

export const order = new mongoose.model('order',orderschema)