import { category } from "../model/categoriesmodel.js";
import { product } from "../model/productmodel.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

export const uploads = multer({ storage: storage })

const addproduct = async (req, res) => {
    try {
        const { name, brand, price, description, category } = req.body
        const image = req.file ? req.file.filename : null
        // const image = req.file.filename
        const add = await product.create({ name, brand, price, description, category, image })
        return res.status(200).json({ message: 'products added sucessfully', add })
    }
    catch (err) {
        return res.send(err)
    }
}
export const findproductid = async (req, res) => {
    try {
        const find = await product.findById(req.params.id).populate('category')
        return res.status(200).json(find)
        
    }
    catch (err) {
        return res.status(500).json({error:err.message})
    }
}


const findproduct = async (req, res) => {
    try {
        const find = await product.find().populate('category', 'name')
        return res.status(200).json(find)
        
    }
    catch (err) {
        return res.status(500).json({error:err.message})
    }
}

const deleteproduct = async (req, res) => {
    try {
        await product.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: 'product deleted sucessfully' })
    }
    catch (err) {
        return res.send(err)
    }
}

//export const findAProduct = async (req,res)=>{
//     try{
//         const findaproduct = await product.findById(req.params.id)
//         res.send(findaproduct)
//     }
//     catch(err){
//         res.status(500).json({message:'something went wrong',err})
//     }
// }

const updateproduct = async (req, res) => {
    try {
        const existing = await product.findById(req.params.id)

        const { name, brand, price,category, description } = req.body
        const image = req.file ? req.file.filename : existing.image
        const update = await product.findByIdAndUpdate(req.params.id,{ name, brand, price,category, description,image } , { new: true })
        return res.status(200).json({ message: 'product updated sucessfully', product:update })
    }
    catch (err) {
         return res.status(500).json({ message: "Failed to update product", error: err.message })
    }
}



export const searchProduct = async (req, res) => {
        console.log("Search route hit with query:", req.query); 
    const { query } = req.query;
    try {
        const products= await product.find({
            name:{$regex:query,$options:'i'}
        })
        res.json(products)
    }
    catch(err){
        res.status(500).json({message:'something went wrong',err})
    }
}

export { addproduct, updateproduct, deleteproduct, findproduct } 