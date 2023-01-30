import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ADMIN from "../Models/AdminSchema.js";
import USERS from "../Models/UserSchema.js"
import VENDOR from "../Models/VendorSchema.js"
import RESTAURANTS from "../Models/RestaurantSchema.js"
import nodeMailer from "nodemailer"
dotenv.config();
const { JWT_SECRET_KEY } = process.env;



export const admin_Login = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const admin = await ADMIN.findOne({ email });
        if (admin) {
            const ispassword = await bcrypt.compare(password, admin.password);
            console.log(ispassword);
            if (ispassword) {
                const Admin = admin.fullname;
                const Email = admin.email
                const Token = jwt.sign({ email: admin.email, id: admin._id }, JWT_SECRET_KEY, { expiresIn: "1h" });
                return res.json({ Admin, Token ,Email})
            }
            throw new Error("Invalid Password")
        }
        throw new Error("Invalid Email")

    } catch (error) {
        console.log(error);
        return error && res.status(401).send(error.message);
    }
}

export const admin_Signup = async (req, res) => {
    try {
        console.log(req.body);
        let { fullname, email, password } = req.body;

        const existingAdmin = await ADMIN.findOne({ email });
        if (existingAdmin) {
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

export const all_Users = async (req, res) => {
    try {
        const Users = await USERS.find({});
        console.log(Users);
        res.status(200).json(Users)
    } catch (error) {
        console.log(error);
    }
}

export const block_User = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(userId);
        await USERS.findOneAndUpdate({ _id: userId }, { $set: { isBlocked: true } }, { new: true });
        const user = await USERS.find({});
        console.log(user);
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
    }
}
export const unblock_User = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(userId);
        await USERS.findOneAndUpdate({ _id: userId }, { $set: { isBlocked: false } }, { new: true });
        const user = await USERS.find({});
        console.log(user);
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
    }
}




export const all_Vendors = async (req, res) => {
    try {
        const Vendors = await VENDOR.find({});
        console.log(Vendors);
        res.status(200).json(Vendors)
    } catch (error) {
        console.log(error);
    }
}

export const block_Vendor = async (req, res) => {
    try {
        const vendorId = req.params.id;
        console.log(vendorId);
        await VENDOR.findOneAndUpdate({ _id: vendorId }, { $set: { isBlocked: true } }, { new: true });
        const vendor = await VENDOR.find({});
        console.log(vendor);
        res.status(200).json(vendor)
    } catch (error) {
        console.log(error);
    }
}
export const unblock_Vendor = async (req, res) => {
    try {
        const vendorId = req.params.id;
        console.log(vendorId);
        await VENDOR.findOneAndUpdate({ _id: vendorId }, { $set: { isBlocked: false } }, { new: true });
        const vendor = await VENDOR.find({});
        console.log(vendor);
        res.status(200).json(vendor)
    } catch (error) {
        console.log(error);
    }
}

export const get_New_Vendors = async (req, res) => {
    try {
        const newVendors = await VENDOR.find({ isApproved: false });
        console.log(newVendors);
        res.status(200).json(newVendors)

    } catch (error) {
        console.log(error);
    }
}

export const get_All_Restaurant = async (req, res) => {
    try {
        const Restaurants = await RESTAURANTS.find({});
        res.status(200).json(Restaurants)
    } catch (error) {
        console.log(error);
    }
}
export const verify_Vendor = async (req, res) => {
    try {
        const vendorId = req.params.id;
        const vendor = await VENDOR.findOne({_id:vendorId});
        const mailTransporter = nodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EmailId,
                pass: process.env.SMTPpassword
            },
        })
        const details = {
            from: "frombookmymenu@gmail.com",
            to: vendor.email,
            subject: "Vendor Account Registration Approval",
            text: "Thank you for registering with BOOK MY MENU, we approved your account and please sign in with your account here.",
            html:`<p>Thank you for registering with BOOK MY MENU, we approved your account and please sign in with your account here.</p>
                   <a href='http://localhost:3000/vendorLogin'>Login</a>`
        }
        
        await VENDOR.findOneAndUpdate({ _id: vendorId }, { $set: { isApproved: true }}, { new: true });
        const newVendors = await VENDOR.find({ isApproved: false });
        mailTransporter.sendMail(details, (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log("mail send succesfully");
            }
        })
        res.status(200).json(newVendors);
    } catch (error) {
        console.log(error);
    }
}