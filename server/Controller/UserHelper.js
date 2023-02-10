import USER from "../Models/UserSchema.js"
import MENU from "../Models/RestaurantMenuSchema.js"
import SLOTS from "../Models/BookedDates.js"
import RESTAURANT from "../Models/RestaurantSchema.js"
import VENDOR from "../Models/VendorSchema.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { otpMailGenerator } from "../Middleware/OtpGenerator.js"
import moment from "moment";
dotenv.config();
const { JWT_SECRET_KEY } = process.env;

let obj = {};
function getTimeStops(start, end) {
    const startTime = moment(start, 'HH:mm');
    const endTime = moment(end, 'HH:mm');

    if (endTime.isBefore(startTime)) {
        endTime.add(1, 'day');
    }

    const timeStops = [];

    while (startTime <= endTime) {
        timeStops.push(new moment(startTime).format('HH:mm'));
        startTime.add(60, 'minutes');
    }
    return timeStops;
}

const convertToObject = (arr) => {
    const intial = {};
    return arr.reduce((acc, curr) => {
        return {
            ...acc,
            [curr]: 0
        }

    }, intial)
}
const array = ["12", "13", "14", "15"];
const obj1 = convertToObject(array)
obj1["12"] = 2
console.log(obj1["12"]);


export const homePage = async (req, res) => {
    try {
        res.send("hello")
    } catch (err) {
        console.log(err);
    }
}
export const check_Email = async (req, res) => {
    try {

        const Email = req.body.email;
        console.log(req.body);
        const existingUser = await USER.findOne({ email: Email });
        if (existingUser) {
            throw new Error("User already Registered");
        } else {
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
        if (existingUser) {
            throw new Error("User already Registered");
        } else {

            if (!otp) {

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
                const phonenumber = User.phonenumber
                const userId = User._id;
                const Token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET_KEY, { expiresIn: "1h" });
                return res.json({ user, Token, Email, userId, phonenumber });
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
                return res.json({ user, Token, Email, userId });
            }
            throw new Error("Incorrect password")

        }
        throw new Error("User not found")

    } catch (error) {
        console.log(error);
        return res.status(401).send(error.message)
    }
}
export const get_user_info = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await USER.findOne({ _id: userId });
        console.log(user);
        res.status(200).json(user)

    } catch (error) {
        console.log(error);
        return res.status(401).send(error.message)
    }
}
export const add_to_Wishlist = async (req, res) => {
    try {

        const userId = req.params.id;
        const wishList = req.params.restid;
        const user = await USER.findOne({ _id: userId });
        if (user.wishlist.length === 0 || !user.wishlist.includes(wishList)) {
            user.wishlist.push(wishList)
        }

        await user.save();
        const User = await USER.findOne({ _id: userId });
        console.log(user);
        res.status(200).json(User)

    } catch (error) {
        console.log(error);
        return res.status(401).send(error.message)
    }
}

export const dele_from_Wishlist = async (req, res) => {
    try {

        const userId = req.params.id;
        const wishList = req.params.restid;
        const user = await USER.findOne({ _id: userId });
        const Wish = user.wishlist?.filter((list) => {
            if (wishList !== list) {
                return list
            }
        })
        await user.updateOne({ $set: { wishlist: Wish } });
        const User = await USER.findOne({ _id: userId });
        console.log(User);
        res.status(200).json(User)
    } catch (error) {
        console.log(error);
        return res.status(401).send(error.message)
    }
}

export const get_Menu = async (req, res) => {
    try {
        const vendorId = req.params.vendorId;
        console.log(vendorId);
        const menu = await MENU.findOne({ vendorId: vendorId });
        console.log(menu);
        res.status(200).json({ menu })

    } catch (error) {
        console.log(error);
        return res.status(401).send(error.message)
    }

}
export const get_available_slot = async (req, res) => {
    try {
        const RestId = req.params.RestId;
        const data = req.body;
        const restaurant = await RESTAURANT.findOne({ _id: RestId })
        const bookedDates = await SLOTS.findOne({ restaurantId: RestId })
        const vendorId = restaurant.vendorId;
        const vendor = await VENDOR.findOne({ _id: vendorId })
        const vendorPhonenumber = vendor.phonenumber;
        const startTime = restaurant.openinghours;
        const closeTime = restaurant.closinghours;
        const range = getTimeStops(startTime, closeTime);
        if (bookedDates) {
            const restBooked = bookedDates?.bookedDates?.filter((item) => {
                if (item.date === data.date) {
                    return item;
                }
            })
            console.log(restBooked);
            res.status(200).json({ restBooked, range, vendorPhonenumber })
        } else {
            const restBooked = [];
            res.status(200).json({ restBooked, range, vendorPhonenumber });
        }
    } catch (error) {
        console.log(error);
        res.status(401).send(error.message);
    }
}
export const date_Booking = async (req, res) => {
    try {
       
        const { time, data, restaurantId } = req.body;
        console.log(req.body);
        console.log(restaurantId);
        const restaurant = await RESTAURANT.findOne({ _id: restaurantId });
        const bookedRest = await SLOTS.findOne({ restaurantId: restaurantId });
        if (bookedRest) {
            if (bookedRest?.bookedDates.length) {
               const changedObj =  bookedRest.bookedDates.filter((item) => {
                    if (item.date == data.date) {
                        const number = item.obj[time] + data.number;
                        console.log(number);
                        if (item.obj[time] < restaurant.seatingcapacity && number <= restaurant.seatingcapacity) {      
                            item.obj[time] = number;
                           return item;
                        }
                        throw new Error("No seat available")
                    }
                })        
                await SLOTS.findOneAndUpdate({ restaurantId: restaurantId }, {$pull: {bookedDates: {_id: changedObj[0]._id}}}, {new: true});
                const added = await SLOTS.findOneAndUpdate({ restaurantId: restaurantId }, {$push: {bookedDates: changedObj}}, {new: true});
                await bookedRest.save();    
                return res.status(200).json(added);
            }
            else {
                const bookings = {
                    date: "",
                    obj: {}
                }
                const startTime = restaurant.openinghours;
                const closeTime = restaurant.closinghours;
                const range = getTimeStops(startTime, closeTime);
                const rangeObj = convertToObject(range);
                rangeObj[time] = data.number;
                bookings.date = data.date;
                bookings.obj = rangeObj;
                console.log(bookings);
                bookedRest.bookedDates.push(bookings)
                await bookedRest.save();
                console.log(bookedRest.bookedDates[0]);
              return  res.status(200).json(bookedRest);
            }

        } else {
            const bookedDates = [];
            const bookings = {
                date: "",
                obj: {}
            }
            const startTime = restaurant.openinghours;
            const closeTime = restaurant.closinghours;
            const range = getTimeStops(startTime, closeTime);
            const rangeObj = convertToObject(range);
            rangeObj[time] = data.number;
            bookings.date = data.date;
            bookings.obj = rangeObj;
            bookedDates.push(bookings);
            console.log(bookedDates);
            console.log(bookings);
            await SLOTS.create({ bookedDates: bookedDates, restaurantId: restaurantId });
        }
    } catch (error) {
        console.log(error);
        res.status(401).send(error.message)
    }
}
