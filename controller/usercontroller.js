import { user } from "../model/usermodel.js";

import bcrypt from "bcrypt"

const adduser = async (req, res) => {
    try{

        console.log("hello");
        
        const { name, email, password } = req.body
        const existing = await user.findOne({ email })
    
        if (existing) {
            return res.status(409).json({ message: 'user already existing' })
        }
        const hash = await bcrypt.hash(password, 10)
        const add = new user({
            name: name,
            email: email,
            password: hash,
            
        })
        await add.save()
        return res.status(200).json({ message: 'registered sucessfully', name, email })
    }
    catch(err){
        console.error(err.message)
        return res.status(500).json({ message: "Internal server error" });
    }
}

const findusers = async (req, res) => {
    try {
        const find = await user.find({ role: 'User' }, { password: 0, __v: 0 })
        res.send(find)
    }
    catch (err) {
        res.send(err)
    }
}
export const getprofile = async (req, res) => {
    try {
        const userId = req.session.userId
        const find = await user.findById({ _id: userId })
        res.send(find)
    }
    catch (err) {
        res.send(err)
    }
}

export const singleUser = async (req, res) => {
    try {
        const singleuser = await user.findById(req.params.id, { password: 0 })
        res.send(singleuser)
    }
    catch (err) {
        res.send(err)
    }
}

export const updateprofile = async (req, res) => {
    const { name, email } = req.body
    const userid = req.session.userId
    try {
        const find = await user.findById({ _id: userid })
        console.log(find);

        if (!find) {
            return res.status(401).json({ message: 'user not found', find })
        }
        const update = await user.updateOne({ _id: find }, { name, email }, { new: true })
        console.log(update);


        return res.send(update)
    }
    catch (err) {
        res.send(err)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const check = await user.findOne({ email })
        console.log(check);


        if (!check) {
            return res.status(404).json('user not found')
            //res.redirect('/login')
        }
        const value = await bcrypt.compare(password, check.password)
        console.log("hello");

        if (!value) {
            return res.status(401).json('incorrect password')
        }
        console.log(value);
        req.session.userId = check._id
        if (check.role === 'User') {
            const data = await user.findOne({ email }, { password: 0 })
            return res.status(201).json({ message: "login sucessful", data })
        }
    }

    catch (err) {
        console.log(err);

        res.status(500).json({ message: 'something went wrong' })
    }
}

const adminlogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const match = await user.findOne({ email,role:"Admin" }, { __v: 0 })
        console.log(match);

        if (!match) {
            return res.status(404).json({ message: 'admin not found' })
        }
        const ismatch = await bcrypt.compare(password, match.password)
        if (!ismatch) {
            return res.status(401).json({ message: 'incorrect password' })
        }

        req.session.adminId = match._id
        if (match.role === 'Admin') {
        const data = await user.findOne({ email }, { password: 0 })

            return res.status(201).json({ message: 'admin login sucessful', data })
        }

    }
    catch (err) {
        res.status(500).json('internal server error')
    }
}

const logout = async (req, res) => {
    try {
        const userid = req.params.id
        console.log(userid);
        if (req.session.userId == userid) {
            req.session.userId = null;
            return res.status(200).json({ message: "user logout success", userid })
        }
        return res.json("fail")
    }

    catch (err) {
        res.json(err)
    } 
}

const adminlogout = async (req, res) => {
    try {
        const adminid = req.session.adminId
        console.log(adminid);
        req.session.adminId = null;
        return res.status(200).json({ message: "admin logout success", adminid })
    }

    catch (err) {
        res.json(err)
    }

}


export { adduser, findusers, login, adminlogin, logout, adminlogout }