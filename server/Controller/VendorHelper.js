import VENDOR from "../Models/VendorSchema.js"
import RESTAURANT from "../Models/RestaurantSchema.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { JWT_SECRET_KEY } = process.env;

export const vendorRegister = async (req, res) => {
    try {
        console.log(req.body);
        const { firstname, lastname, email, phonenumber } = req.body;
        let { password } = req.body;
        const { restaurantname, address, location, typeofcusine, seatingcapacity, openinghours, closinghours, images, pancard, fssai, gst } = req.body;
        const vendor = await VENDOR.findOne({ email });
        if (vendor) {
            throw new Error("Vendor is already registered");
        } else {
            password = await bcrypt.hash(password, 10);
            const Vendor = await VENDOR.create({ firstname, lastname, email, phonenumber, password });
            const vendorId = Vendor._id;
            const Restaurant = await RESTAURANT.create({ restaurantname, address, location, typeofcusine, seatingcapacity, openinghours, closinghours, images, pancard, fssai, gst, vendorId });
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
        const Vendor = await VENDOR.findOne({ email });
        if (Vendor) {
            const iscorrectPassword = await bcrypt.compare(password, Vendor.password)
            if (iscorrectPassword) {
                const isApproved = Vendor.isApproved;
                if (isApproved) {
                    const fullName = Vendor.firstname + " " + Vendor.lastname;
                    const Email = Vendor.email;
                    const Token = jwt.sign({ email: Email, id: Vendor._id }, JWT_SECRET_KEY, { expiresIn: "1h" });
                    res.json({ Restaurant, fullName, email, Token })

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