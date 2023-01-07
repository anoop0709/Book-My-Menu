import USER  from "../Models/UserSchema.js"
import bcrypt from  "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()


export const homePage = async (req,res)=>{
try {
    res.send("hello")
} catch (err) {
    console.log(err);
}
}

export const signup = async (req,res)=>{
    try {
        let {firstname,lastname,email,phonenumber,password} = req.body;
        password = await bcrypt.hash(password,10);

        const User = await USER.create({firstname,lastname,email,phonenumber,password});
        const user = User.firstname + " " + User.lastname;
        const Token = jwt.sign({email:user.email,id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"1h"});
        res.json({user,Token});
    } catch (error) {
        console.log(error);
        
    }
}

