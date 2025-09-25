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

export const userEnable=async(req,res)=>{
    try{
        const enable =  await user.findByIdAndUpdate(req.params.id,{status:"Enable"},{new:true})
       return res.status(200).json({messable:"user enabled",enable})
    }
    catch(err){
        return res.json(err)
    }
}

export const userDisable=async(req,res)=>{
    try{
        const disable = await user.findByIdAndUpdate(req.params.id,{status:"Disable"},{new:true})
        return res.status(200).json({message:"user disabled",disable})
    }
    catch(err){
        return res.json(err)
    }
}
export {deleteuser,editUser}