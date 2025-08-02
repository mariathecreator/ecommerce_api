import { cart } from "../model/cartmodel.js";

export const addtocart = async (req, res) => {
    const product = req.params.id
    const { quantity } = req.body
    const user = req.session.userId


    const newproductid = product
    try {

        if (!user) {
            res.status(401).json({ message: 'no cart found' })
        }
        const cartexist = await cart.findOne({ userId: user })
        console.log(cartexist);

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
            return res.send(addcart)
        }


    }
    catch (err) {
        return res.send(err)
    }
}


export const updatecart = async (req, res) => {
    const product = req.params.id
    const user = req.session.userId
    const { quantity } = req.body

    try {
        const getcart = await cart.findOne({ userId: user })
        console.log(getcart);

        if (!getcart) {
            res.status(401).json({ message: 'no cart found' })
        }
        else {
            const index = getcart.items.findIndex(item => item.product == product)

            if (index !== -1) {
                getcart.items[index].quantity = quantity

            }
            else{
                getcart.items.push(quantity)

            }
            await getcart.save()
            res.send(getcart)
        }

    }
    catch (err) {
        res.send(err)
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