import { product } from "../model/productmodel.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'uploads/')
    },
    filename: (req, file, cd) => {
        cd(null, Date.now() + '-' + file.originalname)
    }
})

export const uploads = multer({ storage: storage })

const addproduct = async (req, res) => {
    try {
        const { name, brand, price, description } = req.body
        const image = req.file.filename
        const add = await product.create({ name, brand, price, description, image })
        return res.status(200).json({ message: 'products added sucessfully' })
    }
    catch (err) {
        return res.send(err)
    }
}
const updateproduct = async (req, res) => {
    try {
        const { name, brand, price, description } = req.body
        const image = req.file ? req.file.filename : existing.image
        const update = await product.findByIdAndUpdate(req.params.id, { name, brand, price, description, image }, { new: true })
        return res.status(201).json({ message: 'product updated sucessfully' })
    }
    catch (err) {
        return res.send(err)
    }
}

const findproduct = async(req,res)=>{
    try{
        const find= await product.find()
        console.log(find);
        
    }
    catch(err){
        res.send(err)
    }
}

const deleteproduct = async(req,res)=>{
    try{
        await product.findByIdAndDelete(req.params.id)
       return res.status(202).json({message:'product deleted sucessfully'})
    }
    catch(err){
      return  res.send(err)
    }
}

export {addproduct,updateproduct,deleteproduct,findproduct} 