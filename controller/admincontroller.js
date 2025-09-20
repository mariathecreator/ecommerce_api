import { user } from "../model/usermodel.js";

const deleteuser=async(req,res)=>{
const get=await user.findByIdAndDelete(req.params.id)
res.send(get)
}

const editUser=async()=>{
    const get =await user.findById(req.params.id)

    const {name,email,role}=req.body
    const update= await user.findByIdAndUpdate(req.params.id,{name,email,role},{new:true})
}

export {deleteuser,editUser}