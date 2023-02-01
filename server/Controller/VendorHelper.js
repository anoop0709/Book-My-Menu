import VENDOR from "../Models/VendorSchema.js"
import RESTAURANT from "../Models/RestaurantSchema.js"
import MENU from "../Models/RestaurantMenuSchema.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { MailSender } from "../Middleware/mailSender.js"
import { otpMailGenerator } from "../Middleware/OtpGenerator.js"
dotenv.config();
const { JWT_SECRET_KEY } = process.env;
let obj = {};





export const vendor_Register = async (req, res) => {
    try {
        const { firstname, lastname, email, phonenumber } = req.body;
        const { restaurantname, address, location, typeofcusine, seatingcapacity, openinghours, closinghours, pancard, fssai, gst, otp } = req.body;
        let { password } = req.body;
        let images = req.body.images;
        const vendor = await VENDOR.findOne({ email });
        if (vendor) {
            throw new Error("Vendor is already registered");
        }
        if (!otp) {
            const newOtp = await otpMailGenerator(email);
            obj[email] = newOtp;
            return res.status(200).json("otp sent")
        }
        if (otp) {
            if (otp === obj[email]) {
                password = await bcrypt.hash(password, 10);
                const Vendor = await VENDOR.create({ firstname, lastname, email, phonenumber, password });
                const vendorId = Vendor._id;
                await RESTAURANT.create({ restaurantname, address, location, typeofcusine, seatingcapacity, openinghours, closinghours, images, pancard, fssai, gst, vendorId });
                await MENU.create({ vendorId });
                MailSender(email);
                return res.status(200).json("waiting for approval")

            }
        }

    } catch (error) {
        console.log(error);
        return res.status(401).send(error.message);
    }
}


export const vendor_Login = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const Vendor = await VENDOR.findOne({ email });
        if (Vendor) {
            console.log(123);
            const iscorrectPassword = await bcrypt.compare(password, Vendor.password)
            if (iscorrectPassword) {
                console.log(456);
                const isApproved = Vendor.isApproved;
                if (isApproved) {
                    const isBlocked = Vendor.isBlocked
                    console.log(789);
                    if (!isBlocked) {
                        const fullName = Vendor.firstname + " " + Vendor.lastname;
                        const Email = Vendor.email;
                        const Token = jwt.sign({ email: Email, id: Vendor._id }, JWT_SECRET_KEY);
                        return res.json({ fullName, email, Token })
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
export const get_single_restaurant = async (req, res) => {
    try {
        const email = req.params.email;
        const Vendor = await VENDOR.findOne({ email });
        const vendorId = Vendor._id;
        const Restaurant = await RESTAURANT.findOne({ vendorId: vendorId });
        console.log(Restaurant);
        return res.status(200).json(Restaurant);

    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    }
}
export const dele_Rest_Image = async (req, res) => {
    try {
        const email = req.params.email;
        let idx = req.params.index;
        idx = parseInt(idx);
        const image = req.body;
        console.log(typeof(idx));
        console.log(email, idx, image);
        const Vendor = await VENDOR.findOne({ email });
        const vendorId = Vendor._id;
        const Restaurant = await RESTAURANT.findOne({ vendorId: vendorId });
        const newImages = Restaurant.images.filter((img, index) => {
            if (idx !== index) {return img};
        })
        console.log(newImages);
        await Restaurant.updateOne({ images: newImages });
        await Restaurant.save();
        const Rest = await RESTAURANT.findOne({ vendorId: vendorId });
        console.log(Rest);
        res.status(200).json(Rest);

    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
}

export const add_Image = async (req,res)=>{
    try {
       
        console.log(req.body);
        let image = req.body;
        const email = req.params.email;
        console.log(image);
        const Vendor = await VENDOR.findOne({ email });
        const vendorId = Vendor._id;
        const Restaurant = await RESTAURANT.findOne({ vendorId: vendorId });
        image?.map((img)=>{
            Restaurant.images.push(img);

        })
        await Restaurant.save();
        const Rest = await RESTAURANT.findOne({ vendorId: vendorId });
        console.log(Rest);
        res.status(200).json(Rest);
        
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
}

export const get_Menu = async (req, res) => {
    try {
        const vendorEmail = req.params.email;
        console.log(vendorEmail);
        const vendor = await VENDOR.findOne({ email: vendorEmail });
        console.log(vendor);
        const menu = await MENU.findOne({ vendorId: vendor._id });
        console.log(menu);
        res.status(200).json({ menu });

    } catch (error) {
        console.log(error);
        res.status(401).send(error.message)
    }
}

export const add_Dish = async (req, res) => {
    try {
        let obj = {};
        obj = req.body.data;
        const collectionName = req.body.collectionName;
        let update = { $push: {} };
        update.$push[collectionName] = obj;
        const vendorEmail = req.params.email;
        const vendor = await VENDOR.findOne({ email: vendorEmail });
        const menu = await MENU.findOneAndUpdate({ vendorId: vendor._id }, update, { new: true });
        console.log(menu);
        res.status(200).json({ menu })

    } catch (error) {
        console.log(error);
        res.status(401).send(error.message)
    }

}

export const edit_Dish = async (req, res) => {
    try {
        let obj = {};
        const vendorEmail = req.body.email;
        const index = req.body.index;
        const collectionName = req.body.collectionName;
        obj = req.body.data
        let update = { $set: {} };
        update.$set[`${collectionName}.${index}`] = obj;
        console.log(obj, update);
        console.log(req.body);
        const vendor = await VENDOR.findOne({ email: vendorEmail });
        const menu = await MENU.findOneAndUpdate({ vendorId: vendor._id }, update, { new: true });
        console.log(menu);
        res.status(200).json({ menu })
    } catch (error) {
        console.log(error);
    }
}
export const dele_Dish = async (req, res) => {
    try {
        let obj = {};
        const vendorEmail = req.body.email;
        const index = req.body.index;
        const collectionName = req.body.collectionName;
        obj = req.body.item
        console.log(obj);
        console.log(req.body);
        const vendor = await VENDOR.findOne({ email: vendorEmail });
        const menu = await MENU.findOne({ vendorId: vendor._id });
        console.log(menu);

        const newList = menu[`${collectionName}`].filter((item, idx) => {
            if (idx !== index) {
                return item;
            }
        })
       
        await menu.updateOne({ [`${collectionName}`]: newList });
        await menu.save();
        const Menu = await MENU.findOne({ vendorId: vendor._id })
        console.log(Menu);
        res.status(200).json({ Menu })
    } catch (error) {
        console.log(error);
    }
}

