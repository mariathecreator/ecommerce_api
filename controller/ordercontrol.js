import { order } from "../model/ordermodel.js"
import { product } from "../model/productmodel.js"
import { cart } from "../model/cartmodel.js"

export const getOrder = async (req, res) => {
    try {
        const userId = req.session.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized. Please log in." });
        }

        const orders = await order
            .find({ user: userId })
            .populate('items.product', 'name price image');

        const formattedOrders = orders.map(o => ({
            ...o._doc,
            items: o.items.map(item => ({
                ...item._doc,
                image: item.product?.image || null,
                productname: item.product?.name || item.productname
            }))
        }));

        res.status(200).json(formattedOrders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const admingetorder = async (req, res) => {
    try {
        const orders = await order
            .find()
            .populate('user', 'name email')                 
            .populate('items.product', 'image name price'); 

       
        const formattedOrders = orders.map(o => ({
            ...o._doc,
            items: o.items.map(item => ({
                ...item._doc,
                image: item.product?.image || null,         
                productname: item.product?.name || item.productname
            }))
        }));
console.log(JSON.stringify(formattedOrders, null, 2));

        res.json(formattedOrders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



export const addOrder = async (req, res) => {
    const userId = req.session.userId
    const { delivery_status } = req.body


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
            subtotal,
            product:productdata._id
        })
    }

    const createorder = await order.create({
        user: userId,
        items,
        total,
        delivery_status
    })

    await cart.deleteOne({ userId })

    res.send(createorder)
}


export const updateOrder = async (req, res) => {
    const { delivery_status } = req.body
    const orderId = req.params.id

    const update = await order.findByIdAndUpdate(orderId, { delivery_status }, { new: true })
    res.send(update)
}

export const cancelOrder = async (req, res) => {
    try {
        const userId = req.session.userId

        const userOrder = await order.findById(req.params.id, { user: userId })
        if (!userOrder) {
            return res.status(404).json(({ message: "order not found " || "unauthorized" }))
        }
        userOrder.delivery_status = "cancelled"
        await userOrder.save()

        res.status(200).json({ message: "order cancelled successfully", order: userOrder })
    }
    catch (err) {
        console.error("Error cancelling order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}








