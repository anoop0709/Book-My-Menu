import bcrypt from  "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Admin from "../Models/AdminSchema.js";
dotenv.config();
const { JWT_SECRET_KEY } = process.env;



export const adminLogin = async (req,res)=>{
    try { 
        console.log(req.body);
        const {email,password} = req.body;

        
        
        const admin = await Admin.findOne({email});
        if(admin){
        const ispassword = await bcrypt.compare(password,admin.password);
        console.log(ispassword);
        if(ispassword){
            const Admin = admin.fullname;
            const Token = jwt.sign({email:admin.email,id:admin._id},JWT_SECRET_KEY,{expiresIn:"1h"});
            res.json({Admin,Token})
        }else {
         
        }
        
    }else{
        console.log(23456765);
        throw new Error("invalid email")
    }
    } catch (error) {
       console.log(error+45345634563);
       throw new Error(error)
    }


}

export const adminSignup = async (req,res)=>{
    try {
        let {fullname,email,password} = req.body;

        const existingAdmin = await Admin.findOne({email});
        if(existingAdmin) res.json("Admin already Registered");
        password = await bcrypt.hash(password,10);

        const admin = await Admin.create({fullname,email,password});
        const Admin  = admin.fullname;
        const Email = admin.email;
        const Token = jwt.sign({email:admin.email,id:admin._id},JWT_SECRET_KEY,{expiresIn:"1h"});
        res.json({Admin,Token,Email});
    } catch (error) {
        console.log(error);
        
    }
}