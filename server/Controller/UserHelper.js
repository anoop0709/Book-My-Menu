import USER from "../Models/UserSchema.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {otpMailGenerator} from "../Middleware/OtpGenerator.js"
dotenv.config();
const { JWT_SECRET_KEY } = process.env;

let obj={};



export const homePage = async (req, res) => {
    try {
        res.send("hello")
    } catch (err) {
        console.log(err);
    }
}

export const user_Signup = async (req, res) => {
    try {
        let { firstname, lastname, email, phonenumber, password, otp } = req.body;
        const existingUser = await USER.findOne({ email });
        if (existingUser) throw new Error("User already Registered");  
        if(!otp){
        
            const newOtp = await otpMailGenerator(email);
            obj[email] = newOtp;
            return res.status(200).json("otp sent")
           
        }
       

        if (otp) {
            if (otp === obj[email]) { 
                password = await bcrypt.hash(password, 10);
                const User = await USER.create({ firstname, lastname, email, phonenumber, password });
                User.isVerified = true;
                await User.save();
                const user = User.firstname + " " + User.lastname;
                const Email = User.email;
                const Token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET_KEY, { expiresIn: "1h" });
                return res.json({ user, Token, Email });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(401).send(error.message)
    }
}

export const user_Signin = async (req, res, next) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const User = await USER.findOne({ email });
        console.log(User);
        if (User) {
            const iscorrectPassword = await bcrypt.compare(password, User.password);
            if (iscorrectPassword) {
                const user = User.firstname + " " + User.lastname;
                const Email = User.email;
                const Token = jwt.sign({ email: User.email, id: User._id }, JWT_SECRET_KEY, { expiresIn: "1h" });
                return res.json({ user, Token, Email });
            }
            throw new Error("Incorrect password")

        }
        throw new Error("User not found")

    } catch (error) {
        console.log(error);
        return res.status(401).send(error.message)
    }
}


