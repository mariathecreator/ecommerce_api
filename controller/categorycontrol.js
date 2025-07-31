import { category } from "../model/categoriesmodel.js"

const getcategory = async (req, res) => {
    try {
        const find = await category.find()
        console.log(find);
        //return  res.status(200)
    }
    catch(err){
       return res.send(err)
    }
   
    
}

const addcategory = async (req, res) => {
    try {
        const { name, description } = req.body
        await category.create({ name, description })
      return  res.status(200).json({ message: 'category added sucessfully' })
    }
    catch (err) {
       return res.send(err)
    }
}

const updatecategory = async (req, res) => {
    try {
        const { name, description } = req.body
        await category.findByIdAndUpdate(req.params.id, { name, description }, { new: true })
        return res.status(200).json({ message: 'category updated sucessfully' })
    }
    catch (err) {
        return res.send(err)
    }
}

const deletecategory = async (req, res) => {
    try {
        await category.findByIdAndDelete(req.params.id)
        return res.status(202).json({ message: 'product deleted sucessfully' })
    }
    catch (err) {
     return   res.send(err)
    }
}

export { getcategory, updatecategory, addcategory, deletecategory }