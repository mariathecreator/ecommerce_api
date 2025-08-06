import { order } from "../model/ordermodel.js"
import { product } from "../model/productmodel.js"
import { cart } from "../model/cartmodel.js"

export const getOrder = async (req, res) => {
    const getorder = await order.find()
    res.send(getorder)
}

export const getorderbyid = async(req,res)=>{
    const getorderbyId = await order.findById(req.params.id)
    res.send(getorderbyId)
}


export const addOrder = async (req, res) => {
    const userId = req.session.userId
    const {delivery_status}= req.body


    console.log(userId);


    const iscart = await cart.findOne({ userId })
    console.log(iscart);

    if (!iscart) {
        res.status(404).json({ message: 'cart not found' })
    }

    let subtotal = 0
    let total = 0
    let items = []
    for (let item of iscart.items) {
        const productdata = await product.findOne(item.product)
        console.log(productdata);

        if (!productdata) { continue }
        
        subtotal = productdata.price * item.quantity,
        
        total += subtotal
        
        items.push({
            userId,
            productname: productdata.name,
            price: productdata.price,
            quantity: item.quantity,
            subtotal
        })
    }
    
    const createorder = await order.create({
        user:userId,
        items,
        total,
        delivery_status
    })

    await cart.deleteOne({ userId })

    res.send(createorder)
}


export const updateOrder = async(req,res)=>{
    const {delivery_status} = req.body
    const orderId = req.params.id

    const update = await order.findByIdAndUpdate(orderId,{delivery_status},{new:true})
    res.send(update)
}

 export const deleteOrder = async(req,res)=>{
    const deletedorder = await order.findByIdAndDelete(req.params.id)
    res.send(deletedorder)
}








