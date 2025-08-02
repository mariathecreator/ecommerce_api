import { user } from "../model/usermodel.js";

import bcrypt from "bcrypt"

const adduser = async (req, res) => {
    const { name, email, password, role } = req.body
    const existing = await user.findOne({ email })

    if (existing) {
        return res.status(409).json({ message: 'user already existing' })
    }
    const hash = await bcrypt.hash(password, 10)
    const add = new user({
        name: name,
        email: email,
        password: hash,
        role: role
    })
    await add.save()
    return res.status(203).json({ message: 'registered sucessfully' })
}

const findusers=async(req,res)=>{
    const find = await user.find()
    res.send(find)
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

        if (!value) {
            return res.status(401).json('incorrect password')
        }
        req.session.userId = check._id
if(check.role==='User'){

    return res.status(201).json({ message: 'login succesful', check })
}
        }
    
    catch (err) {
        res.status(500).json({ message: 'something went wrong' })
    }
}

const adminlogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const match = await user.findOne({ email }, { __v: 0 })
        console.log(match);

        if (!match) {
            return res.status(404).json({ message: 'admin not found' })
        }
        const ismatch = await bcrypt.compare(password, match.password)
        if (!ismatch) {
            return res.status(401).json({ message: 'incorrect password' })
        }

        req.session.adminId = match._id
        if(match.role==='Admin'){

            return res.status(201).json({ message: 'admin login sucessful', match })
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


export { adduser,findusers, login, adminlogin, logout, adminlogout }