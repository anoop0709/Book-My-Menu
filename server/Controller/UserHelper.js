import USER from "../Models/UserSchema.js"
import MENU from "../Models/RestaurantMenuSchema.js"
import SLOTS from "../Models/BookedDates.js"
import RESTAURANT from "../Models/RestaurantSchema.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {otpMailGenerator} from "../Middleware/OtpGenerator.js"
import moment from "moment";
dotenv.config();
const { JWT_SECRET_KEY } = process.env;

let obj={};
function getTimeStops(start, end){
    const startTime = moment(start, 'HH:mm');
    const endTime = moment(end, 'HH:mm');
    
    if( endTime.isBefore(startTime) ){
      endTime.add(1, 'day');
    }
  
    const timeStops = [];
  
    while(startTime <= endTime){
      timeStops.push(new moment(startTime).format('HH:mm'));
      startTime.add(60, 'minutes');
    }
    return timeStops;
  }



export const homePage = async (req, res) => {
    try {
        res.send("hello")
    } catch (err) {
        console.log(err);
    }
}
export const check_Email = async (req,res) => {
    try {
        
        const Email = req.body.email;
        console.log(req.body);
        const existingUser = await USER.findOne({email:Email });
        if (existingUser){ 
            throw new Error("User already Registered");  
        }else{
            res.status(200).json("ok")
        }
    } catch (error) {
        console.log(error);
        return res.status(401).send(error.message)
    }
}

export const user_Signup = async (req, res) => {
    try {
        let { firstname, lastname, email, phonenumber, password, otp } = req.body;
        const existingUser = await USER.findOne({ email });
        if (existingUser){ 
            throw new Error("User already Registered");  
        }else{

            if(!otp){
                
                const newOtp = await otpMailGenerator(email);
                obj[email] = newOtp;
                return res.status(200).json("otp sent")
                
            }
        }
       

        if (otp) {
            if (otp === obj[email]) { 
                password = await bcrypt.hash(password, 10);
                const User = await USER.create({ firstname, lastname, email, phonenumber, password });
                User.isVerified = true;
                await User.save();
                const user = User.firstname + " " + User.lastname;
                const Email = User.email;
                const userId = User._id;
                const Token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET_KEY, { expiresIn: "1h" });
                return res.json({ user, Token, Email, userId });
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
                const userId = User._id;
                const Token = jwt.sign({ email: User.email, id: User._id }, JWT_SECRET_KEY, { expiresIn: "1h" });
                return res.json({ user, Token, Email,userId  });
            }
            throw new Error("Incorrect password")

        }
        throw new Error("User not found")

    } catch (error) {
        console.log(error);
        return res.status(401).send(error.message)
    }
}
export const get_user_info = async (req,res)=> {
    try {
        const userId = req.params.id;
        const user = await USER.findOne({_id:userId});
        console.log(user);
        res.status(200).json(user)
        
    } catch (error) {
        console.log(error);
        return res.status(401).send(error.message)
    }
}
export const add_to_Wishlist = async (req,res)=>{
    try {
      
        const userId = req.params.id;
        const wishList = req.params.restid;
        const user = await USER.findOne({_id:userId});
        if(user.wishlist.length === 0 || !user.wishlist.includes(wishList)){
            user.wishlist.push(wishList)
        }
           
        await user.save();
        const User = await USER.findOne({_id:userId});
        console.log(user);
        res.status(200).json(User)
        
    } catch (error) {
        console.log(error);
        return res.status(401).send(error.message)
    }
}

export const dele_from_Wishlist = async (req,res)=>{
    try {
       
        const userId = req.params.id;
        const wishList = req.params.restid;
        const user = await USER.findOne({_id:userId});
         const Wish  =  user.wishlist?.filter((list)=>{
                if(wishList !== list){
                   return list
                }
            })
         await user.updateOne({$set:{wishlist:Wish}});
        const User = await USER.findOne({_id:userId});
        console.log(User);
        res.status(200).json(User)
    } catch (error) {
        console.log(error);
        return res.status(401).send(error.message)
    }
}

export const get_Menu = async (req,res)=>{
    try {
        const vendorId = req.params.vendorId;
        console.log(vendorId);
       const menu = await MENU.findOne({vendorId:vendorId});
       console.log(menu);
       res.status(200).json({menu})
        
    } catch (error) {
        console.log(error);
        return res.status(401).send(error.message)
    }

}
 export const get_available_slot = async (req,res) => {
     try {
         const RestId = req.params.RestId; 
         const  data = req.body;
         const restaurant = await RESTAURANT.findOne({_id:RestId})
         const bookedDates = await SLOTS.findOne({restaurantId:RestId})
         const startTime = restaurant.openinghours;
         const closeTime = restaurant.closinghours;
         const range = getTimeStops(startTime,closeTime);
         console.log(range);

         
         console.log(bookedDates);
         const restBooked =  bookedDates.bookedDates.filter((item)=>{
            if(item.date === data.date){
                return item;
            }
         })
         res.status(200).json({restBooked,range})
       
     } catch (error) {
         console.log(error);
     }
 }
