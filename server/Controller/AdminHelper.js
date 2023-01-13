import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ADMIN from "../Models/AdminSchema.js";
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
                throw "Invalid Password"  

        } 
            throw "Invalid Email"
        
    } catch (error) {
        console.log(error);
       return error && res.status(401).send(error);
    }
}

export const adminSignup = async (req, res) => {
    try {
        console.log(req.body);
        let { fullname, email, password } = req.body;

        const existingAdmin = await ADMIN.findOne({ email });
        if (existingAdmin){ 
            throw "Admin already Registered";
        }
        password = await bcrypt.hash(password, 10);

        const admin = await ADMIN.create({ fullname, email, password });
        const Admin = admin.fullname;
        const Email = admin.email;
        const Token = jwt.sign({ email: admin.email, id: admin._id }, JWT_SECRET_KEY, { expiresIn: "1h" });
        res.json({ Admin, Token, Email });
    } catch (error) {
        console.log(error);
        return res.status(401).send(error);
    }
}