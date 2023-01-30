import USER from "../Models/UserSchema.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodeMailer from "nodemailer"
dotenv.config();
const { JWT_SECRET_KEY } = process.env;
let obj = {};

const randomOtp = () => {

    const Otpforsignup = Math.floor(1000 + Math.random() * 9000);
    console.log(Otpforsignup);
    return Otpforsignup;

}

export const homePage = async (req, res) => {
    try {
        res.send("hello")
    } catch (err) {
        console.log(err);
    }
}

export const user_Signup = async (req, res) => {
    try {
        console.log(req.body);
        let { firstname, lastname, email, phonenumber, password, otp } = req.body;
        console.log(req.body.otp);
        console.log(otp, 3452352);

        if (!otp) {
            console.log("mairuuu paripadi");
            const newOtp = randomOtp();
            obj[email] = newOtp

        }

        console.log(obj, 98765432);
        const existingUser = await USER.findOne({ email });
        if (existingUser) throw new Error("User already Registered");
        if (!otp) {
            const mailTransporter = nodeMailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EmailId,
                    pass: process.env.SMTPpassword
                },
            })

            const Otpdetails = {
                from: "frombookmymenu@gmail.com",
                to: email,
                subject: "Vendor Account OTP Verification",
                text: `Thank you for registering with BOOK MY MENU, Please verify your email with this OTP ${obj.otp}`
            }
            mailTransporter.sendMail(Otpdetails, (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("mail send succesfully");
                    return res.status(200).json("otp sent");
                }
            })
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

export const verify_Otp = async (req, res) => {
    try {
        console.log(req.body);
        const otp = req.body.otp;
        const email = req.body.email;
        console.log(otp, email);
    } catch (error) {
        console.log(error);
    }
}

