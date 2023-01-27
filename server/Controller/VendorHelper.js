import VENDOR from "../Models/VendorSchema.js"
import RESTAURANT from "../Models/RestaurantSchema.js"
import MENU from "../Models/RestaurantMenuSchema.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodeMailer from "nodemailer"
dotenv.config();
const { JWT_SECRET_KEY } = process.env;



export const vendor_Register = async (req, res) => {
    try {
        console.log(req.body.images);
        const { firstname, lastname, email, phonenumber } = req.body;
        let { password } = req.body;
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
            to: email,
            subject: "Vendor Account Registration",
            text: " Thank you for registering with BOOK MY MENU, we will verify your account and send you a email notification once approved."
        }


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
            await MENU.create({ vendorId })
            mailTransporter.sendMail(details, (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("mail send succesfully");
                }
            })
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
                        const Token = jwt.sign({ email: Email, id: Vendor._id }, JWT_SECRET_KEY, { expiresIn: "1h" });
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

export const add_Starter = async (req, res) => {
    try {
        let starter = {};
        starter = req.body;
        console.log(starter);
        const vendorEmail = req.params.email;
        const vendor = await VENDOR.findOne({ email: vendorEmail });
        await MENU.findOneAndUpdate({ vendorId: vendor._id }, { $push: { starter: starter } });
        const menu = await MENU.findOne({ vendorId: vendor._id })
        console.log(menu);
        res.status(200).json({ menu })

    } catch (error) {
        console.log(error);
        res.status(401).send(error.message)
    }

}

export const edit_Starter = async (req, res) => {
    try {
        let obj = {};
        const vendorEmail = req.body.email;
        const index = req.body.index;
        obj = req.body.data
        console.log(obj);
        console.log(req.body);
        const vendor = await VENDOR.findOne({ email: vendorEmail });
        const menu = await MENU.findOne({ vendorId: vendor._id });
        menu.starter[index] = obj;
        await menu.save();
        const Menu = await MENU.findOne({ vendorId: vendor._id })
        console.log(Menu);
        res.status(200).json({ Menu })

    } catch (error) {
        console.log(error);
    }
}
export const dele_Starter = async (req,res)=>{
    try {
        let obj = {};
        const vendorEmail = req.body.email;
        const index = req.body.index;
        obj = req.body.data
        console.log(obj);
        console.log(req.body);
        const vendor = await VENDOR.findOne({ email: vendorEmail });
        const menu = await MENU.findOne({ vendorId: vendor._id });
        const newStarter = menu.starter.filter((item,idx)=>{
            if(idx !== index){
                return item;
            }
        })
        await menu.updateOne({starter:newStarter});
        await menu.save();
        const Menu = await MENU.findOne({ vendorId: vendor._id })
        console.log(Menu);
        res.status(200).json({ Menu })
        
    } catch (error) {
        console.log(error);
    }
}
export const add_Sidedish = async (req, res) => {
    try {
        let sidedish = {};
        sidedish = req.body;
        const vendorEmail = req.params.email;
        const vendor = await VENDOR.findOne({ email: vendorEmail });
        await MENU.findOneAndUpdate({ vendorId: vendor._id }, { $push: { sidedish: sidedish } });
        const menu = await MENU.findOne({ vendorId: vendor._id })
        console.log(menu);
        res.status(200).json({ menu })

    } catch (error) {
        console.log(error);
        res.status(401).send(error.message)
    }

}
export const edit_Sidedish = async (req, res) => {
    try {
        let obj = {};
        const vendorEmail = req.body.email;
        const index = req.body.index;
        obj = req.body.data
        console.log(obj);
        console.log(req.body);
        const vendor = await VENDOR.findOne({ email: vendorEmail });
        const menu = await MENU.findOne({ vendorId: vendor._id });
        menu.sidedish[index] = obj;
        await menu.save();
        const Menu = await MENU.findOne({ vendorId: vendor._id })
        console.log(Menu);
        res.status(200).json({ Menu })

    } catch (error) {
        console.log(error);
    }
}
export const dele_Sidedish = async (req,res)=>{
    try {
        let obj = {};
        const vendorEmail = req.body.email;
        const index = req.body.index;
        obj = req.body.data
        console.log(obj);
        console.log(req.body);
        const vendor = await VENDOR.findOne({ email: vendorEmail });
        const menu = await MENU.findOne({ vendorId: vendor._id });
        const newSidedish = menu.sidedish.filter((item,idx)=>{
            if(idx !== index){
                return item;
            }
        })
        await menu.updateOne({sidedish:newSidedish});
        await menu.save();
        const Menu = await MENU.findOne({ vendorId: vendor._id })
        console.log(Menu);
        res.status(200).json({ Menu })
        
    } catch (error) {
        console.log(error);
    }
}