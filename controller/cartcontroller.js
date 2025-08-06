import mongoose from "mongoose"
import { cart } from "../model/cartmodel.js";
import { product } from "../model/productmodel.js";

export const addtocart = async (req, res) => {
    const productId = req.params.id
    const { quantity } = req.body
    const user = req.session.userId


    //const newproductid = productId
    try {

        if (!user) {
            res.status(401).json({ message: 'no cart found' })
        }
        const cartexist = await cart.findOne({ userId: user })
        const productexist = await product.findOne({ _id: productId })
        console.log(cartexist);
        console.log(productexist);


        console.log("this is your captian speaking");
        if (cartexist) {
            const existingindex = await cartexist.items.findIndex((item) => {
                return item.product == productId
            })
            console.log(existingindex);

            if (existingindex !== -1) {
                console.log("this is the if part");

                cartexist.items[existingindex].quantity += quantity
                // cartexist.items[existingindex].subtotal = cartexist.items[existingindex].quantity * productexist.price
                //  cartexist.total += cartexist.items[existingindex].subtotal
            }
            else {
                console.log("this is the else part");

                const name = {

                    product: productId,
                    quantity
                    // subtotal: quantity * productexist.price,
                    //  total: { $sum: subtotal }


                }
                console.log("why are you like this ");

                cartexist.items.push(name)
                console.log("you made me do this ");


            }
            await cartexist.save()
            return res.json({ message: "product added to cart sucessfully", cartexist })

        }
        else {
            const cartdata = {
                userId: user,
                items: [{
                    product: productId,
                    quantity
                    // subtotal: quantity * productexist.price
                }
                ]
                // total: subtotal

            }
            const addcart = await cart.create(cartdata)
            return res.send(addcart)
        }


    }
    catch (err) {
        return res.send(err)
    }
}



export const updatecart = async (req, res) => {
    const productId = req.params.id
    const user = req.session.userId
    const { quantity } = req.body

    try {
        const getcart = await cart.findOne({ userId: user })
        // const getproduct = await product.findOne({ _id: productId })
        console.log(getcart);
        // console.log(getproduct);


        if (!getcart) {
            return res.status(401).json({ message: 'no cart found' })
        }
        else {
            const index = getcart.items.findIndex(item => item.product.toString() === productId)
            console.log(index);


            if (index !== -1) {
                getcart.items[index].quantity = quantity
                // getcart.items[index].subtotal = getcart.items[index].quantity * getproduct.price
                console.log("get out here! now");
            }
            else {
                const item = {
                    product: productId,
                    quantity,
                    // subtotal: quantity * getproduct.price
                }
                getcart.items.push(item)


            }
            await getcart.save()
            console.log("don't be shy");
            // console.log(getcart);
            return res.json({ message: "product added to cart sucessfully", getcart })

            // return sub.length > 0 ? sub[0].subtotal : 0;
        }

    }
    catch (err) {
        return res.send(err)
    }
}

export const viewcart = async (req, res) => {
    const userId = req.session.userId
    try {
        const cartdetails = await cart.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            { $unwind: '$items' },
            {
                $lookup: {
                    from: 'products',
                    localField: 'items.product',
                    foreignField: '_id',
                    as: 'productDetails'
                }
            },
            { $unwind: '$productDetails' },
            {
                $addFields: {
                    'items.product_name': '$productDetails.name',
                    'items.product_price': '$productDetails.price',
                    'items.subtotal': {
                        $multiply: ['$items.quantity', '$productDetails.price']
                    }

                }
            },
            {
                $group: {
                    _id: '$_id',
                    userId: { $first: '$userId' },
                    items: { $push: '$items' },
                    total: { $sum: '$items.subtotal' }
                }
            }
        ])
        console.log(cartdetails);
        

        if(cartdetails.length === 0){
            return res.json({message:'cart is empty'})
        }
        res.json(cartdetails[0])
    }
    catch(err){
        res.status(500).json(err)
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