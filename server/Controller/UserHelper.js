import USER  from "../Models/UserSchema.js"
import bcrypt from  "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { JWT_SECRET_KEY } = process.env;


export const homePage = async (req,res)=>{
try {
    res.send("hello")
} catch (err) {
    console.log(err);
}
}

export const userSignup = async (req,res)=>{
    try {
        let {firstname,lastname,email,phonenumber,password} = req.body;

        const existingUser = await USER.findOne({email});
        if(existingUser) res.json("User already Registered");
        password = await bcrypt.hash(password,10);

        const User = await USER.create({firstname,lastname,email,phonenumber,password});
        const user = User.firstname + " " + User.lastname;
        const Email = User.email;
        const Token = jwt.sign({email:user.email,id:user._id},JWT_SECRET_KEY,{expiresIn:"1h"});
        res.json({user,Token,Email});
    } catch (error) {
        console.log(error);
        
    }
}

export const userSignin = async (req,res)=>{
    try {
        console.log(req.body);
        const {email,password} = req.body;
        const User = await USER.findOne({email});
        console.log(User);
        if(User){
          const iscorrectPassword =   await bcrypt.compare(password,User.password);
          if(iscorrectPassword){
            const user = User.firstname + " " + User.lastname;
            const Email = User.email;
            const Token = jwt.sign({email:User.email,id:User._id},JWT_SECRET_KEY,{expiresIn:"1h"});
            res.json({user,Token,Email});
          }
        }
    } catch(error) {
        console.log(error);
        res.status(500).json("something went wrong");
    }
}

