import mongoose from "mongoose";
import { product } from "../model/productmodel.js";
import { user } from "./usermodel.js";

const cartschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        subtotal:{
            type:Number,
            default:0
        }
    }],
    total: {
        type: Number,
       default:0
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

export const cart = new mongoose.model('cart', cartschema)


