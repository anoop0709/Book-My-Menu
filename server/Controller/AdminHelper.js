import bcrypt from  "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Admin from "../Models/AdminSchema.js";
dotenv.config();
const { JWT_SECRET_KEY } = process.env;

export const adminLogin = async (req,res)=>{
    const {email,password} = req.body;
    const admin = await Admin.findOne({email});
    password = await bcrypt.compare(password,admin.password);
    if(password){
        const Admin = admin.fullname;
        const Token = jwt.sign({email:admin.email,id:admin._id},JWT_SECRET_KEY,{expiresIn:"1h"});
        res.json({Admin,Token});
    }


}