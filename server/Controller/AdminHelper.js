import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ADMIN from "../Models/AdminSchema.js";
import USERS from "../Models/UserSchema.js"
dotenv.config();
const { JWT_SECRET_KEY } = process.env;



export const adminLogin = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const admin = await ADMIN.findOne({ email });
        if (admin) {
            const ispassword = await bcrypt.compare(password, admin.password);
            console.log(ispassword);
            if (ispassword) {
                const Admin = admin.fullname;
                const Token = jwt.sign({ email: admin.email, id: admin._id }, JWT_SECRET_KEY, { expiresIn: "1h" });
               return res.json({ Admin, Token })
            }
                throw new Error("Invalid Password") 

        } 
            throw new Error("Invalid Email")
        
    } catch (error) {
        console.log(error);
       return error && res.status(401).send(error.message);
    }
}

export const adminSignup = async (req, res) => {
    try {
        console.log(req.body);
        let { fullname, email, password } = req.body;

        const existingAdmin = await ADMIN.findOne({ email });
        if (existingAdmin){ 
            throw new Error("Admin already Registered");
        }
        password = await bcrypt.hash(password, 10);

        const admin = await ADMIN.create({ fullname, email, password });
        const Admin = admin.fullname;
        const Email = admin.email;
        const Token = jwt.sign({ email: admin.email, id: admin._id }, JWT_SECRET_KEY, { expiresIn: "1h" });
        res.json({ Admin, Token, Email });
    } catch (error) {
        console.log(error);
        return res.status(401).send(error.message)
    }
}

export const allUsers = async (req,res)=>{
    try {
        const Users = await USERS.find({});
        console.log(Users);
        res.status(200).json(Users)
    } catch (error) {
        console.log(error);
    }
}

export const blockUser = async (req,res)=>{
    try {
        const userId = req.params.id;
        console.log(userId);
        await USERS.findOneAndUpdate({_id:userId},{$set:{isBlocked:true}},{new:true});
        const user = await USERS.find({});
        console.log(user);
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
    }
}
export const UnblockUser = async (req,res)=>{
    try {
        const userId = req.params.id;
        console.log(userId);
         await USERS.findOneAndUpdate({_id:userId},{$set:{isBlocked:false}},{new:true});
         const user = await USERS.find({});
        console.log(user);
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
    }
}