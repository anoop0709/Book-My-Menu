import VENDOR from "../Models/VendorSchema.js"
import RESTAURANT from "../Models/RestaurantSchema.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "express-fileupload"
dotenv.config();
const { JWT_SECRET_KEY } = process.env;

export const vendorRegister = async (req, res) => {
    try {
        console.log(req.body.images);
        const { firstname, lastname, email, phonenumber } = req.body;
        let { password } = req.body;
        
     
        const { restaurantname, address, location, typeofcusine, seatingcapacity, openinghours, closinghours, pancard, fssai, gst } = req.body;
       let images = req.body.images;
        console.log(images);
        const vendor = await VENDOR.findOne({ email });
        if (vendor) {
            throw new Error("Vendor is already registered");
        } else {
            password = await bcrypt.hash(password, 10);
            const Vendor = await VENDOR.create({ firstname, lastname, email, phonenumber, password });
            const vendorId = Vendor._id;
            await RESTAURANT.create({ restaurantname, address, location, typeofcusine, seatingcapacity, openinghours, closinghours, images, pancard, fssai, gst, vendorId });
        }

    } catch (error) {
        console.log(error);
        return res.status(401).send(error.message);
    }
}

export const vendorLogin = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const Vendor = await VENDOR.findOne({email});
        if (Vendor) {
            console.log(123);
            const iscorrectPassword = await bcrypt.compare(password, Vendor.password)
            if (iscorrectPassword) {
                console.log(456);
                const isApproved = Vendor.isApproved;
                if (isApproved) {
                    const isBlocked = Vendor.isBlocked
                    console.log(789);
                    if(!isBlocked){
                        const fullName = Vendor.firstname + " " + Vendor.lastname;
                        const Email = Vendor.email;
                        const Token = jwt.sign({ email: Email, id: Vendor._id }, JWT_SECRET_KEY, { expiresIn: "1h" });
                        res.json({fullName,email,Token})
                    }
                    throw new Error("Your Account is Blocked please contact the Customer care");
                }
                throw new Error("Your Account is not Approved");
            }
            throw new Error("Wrong Password");
        }
        throw new Error("Vendor not Registered")
    } catch (error) {
        console.log(error.message);
        return res.status(401).send(error.message);
    }
}