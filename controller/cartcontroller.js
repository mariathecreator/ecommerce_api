import { cart } from "../model/cartmodel.js";
// import { user } from "../model/usermodel.js";
// import { product } from "../model/productmodel.js";
// import mongoose from "mongoose";

export const addtocart = async (req, res) => {
    const product = req.params.id
    const { quantity } = req.body
    const user = req.session.userId


    console.log(product);


    const newproductid = product
    try {

        if (!user) {
            res.status(401).json({ message: 'no user session found' })
        }
        const cartexist = await cart.findOne({ userId: user })
        console.log(cartexist);
        console.log("hai");

        if (cartexist) {
            const existingindex = await cartexist.items.findIndex((item) => {
                return item.product == newproductid
            })

            if (existingindex !== -1) {
                cartexist.items[existingindex].quantity += quantity
            }
            else {

                const name = {
                    product, quantity
                }
                cartexist.items.push(name)
            }
            await cartexist.save()
            return res.json({ message: "product added to cart sucessfully", cartexist })

        }
        else {
            const cartdata = {
                userId: user,
                items: [{
                    product,
                    quantity
                }]
            }
            const addcart = await cart.create(cartdata)
            console.log("hauwai");
            return res.send(addcart)
        }


    }
    catch (err) {
        return res.send(err)
    }
}


export const deleteCartItem = async (req, res) => {
    const user = req.session.userId
    const productId = req.params.id

    const newproduct = productId

    try {
        const findcart = await cart.findOne({ userId: user })
        if (!findcart) {
            return res.status(401).json({ message: 'No cart found for this user' })
        }
        findcart.items = findcart.items.filter(item => item.product.toString() !== newproduct)
        await findcart.save()
        
        
        return res.status(202).json({ message: 'item deleted from cart sucessfully', findcart })
    }
    catch (err) {
        return res.send(err)
    }
}