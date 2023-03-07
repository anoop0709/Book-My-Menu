import USER from "../Models/UserSchema.js";
import MENU from "../Models/RestaurantMenuSchema.js";
import SLOTS from "../Models/BookedDates.js";
import RESTAURANT from "../Models/RestaurantSchema.js";
import VENDOR from "../Models/VendorSchema.js";
import BOOKINGS from "../Models/Bookings.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { otpMailGenerator } from "../Middleware/OtpGenerator.js";
import moment from "moment";
dotenv.config();
const { JWT_SECRET_KEY } = process.env;

let obj = {};
function getTimeStops(start, end) {
  const startTime = moment(start, "HH:mm");
  const endTime = moment(end, "HH:mm");

  if (endTime.isBefore(startTime)) {
    endTime.add(1, "day");
  }

  const timeStops = [];

  while (startTime <= endTime) {
    timeStops.push(new moment(startTime).format("HH:mm"));
    startTime.add(60, "minutes");
  }
  return timeStops;
}

const convertToObject = (arr) => {
  const intial = {};
  return arr.reduce((acc, curr) => {
    return {
      ...acc,
      [curr]: 0,
    };
  }, intial);
};

export const homePage = async (req, res) => {
  try {
    res.send("hello");
  } catch (err) {
    console.log(err);
  }
};
export const check_Email = async (req, res) => {
  try {
    const Email = req.body.email;
    console.log(req.body);
    const existingUser = await USER.findOne({ email: Email });
    if (existingUser) {
      throw new Error("User already Registered");
    } else {
      res.status(200).json("ok");
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send(error.message);
  }
};

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
        return res.status(200).json("otp sent");
      }
    }

    if (otp) {
      if (otp === obj[email]) {
        password = await bcrypt.hash(password, 10);
        const User = await USER.create({
          firstname,
          lastname,
          email,
          phonenumber,
          password,
        });
        User.isVerified = true;
        await User.save();
        const user = User.firstname + " " + User.lastname;
        const Email = User.email;
        const phonenumber = User.phonenumber;
        const userId = User._id;
        const Token = jwt.sign(
          { email: user.email, id: user._id },
          JWT_SECRET_KEY,
          { expiresIn: "1h" }
        );
        return res.json({ user, Token, Email, userId, phonenumber });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send(error.message);
  }
};

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
        const phonenumber = User.phonenumber;
        const userId = User._id;
        const Token = jwt.sign(
          { email: User.email, id: User._id },
          JWT_SECRET_KEY,
          { expiresIn: "1h" }
        );
        return res.json({ user, Token, Email, userId, phonenumber });
      }
      throw new Error("Incorrect password");
    }
    throw new Error("User not found");
  } catch (error) {
    console.log(error);
    return res.status(401).send(error.message);
  }
};
export const get_user_info = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await USER.findOne({ _id: userId });
    const User = {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phonenumber: user.phonenumber,
      address: user.address,
      wishList: user.wishList,
      cart: user.cart,
    };
    console.log(User);
    res.status(200).json(User);
  } catch (error) {
    console.log(error);
    return res.status(401).send(error.message);
  }
};
export const add_to_Wishlist = async (req, res) => {
  try {
    const userId = req.params.id;
    const wishList = req.params.restid;
    const user = await USER.findOne({ _id: userId });
    if (user.wishList.length === 0 || !user.wishList.includes(wishList)) {
      user.wishList.push(wishList);
    }

    await user.save();
    const User = await USER.findOne({ _id: userId });
    console.log(user);
    res.status(200).json(User);
  } catch (error) {
    console.log(error);
    return res.status(401).send(error.message);
  }
};

export const dele_from_Wishlist = async (req, res) => {
  try {
    const userId = req.params.id;
    const wishList = req.params.restid;
    const user = await USER.findOne({ _id: userId });
    const Wish = user.wishList?.filter((list) => {
      if (wishList !== list) {
        return list;
      }
    });
    await user.updateOne({ $set: { wishList: Wish } });
    const User = await USER.findOne({ _id: userId });
    console.log(User);
    res.status(200).json(User);
  } catch (error) {
    console.log(error);
    return res.status(401).send(error.message);
  }
};

export const get_Menu = async (req, res) => {
  try {
    const vendorId = req.params.vendorId;
    console.log(vendorId);
    const menu = await MENU.findOne({ vendorId: vendorId });
    console.log(menu);
    res.status(200).json({ menu });
  } catch (error) {
    console.log(error);
    return res.status(401).send(error.message);
  }
};
export const get_available_slot = async (req, res) => {
  try {
    const RestId = req.params.RestId;
    const data = req.body;
    const restaurant = await RESTAURANT.findOne({ _id: RestId });
    const bookedDates = await SLOTS.findOne({ restaurantId: RestId });
    const vendorId = restaurant.vendorId;
    const vendor = await VENDOR.findOne({ _id: vendorId });
    const vendorPhonenumber = vendor.phonenumber;
    const startTime = restaurant.openinghours;
    const closeTime = restaurant.closinghours;
    const range = getTimeStops(startTime, closeTime);
    if (bookedDates) {
      const restBooked = bookedDates?.bookedDates?.filter((item) => {
        if (item.date === data.date) {
          return item;
        }
      });
      console.log(restBooked);
      return res.status(200).json({ restBooked, range, vendorPhonenumber });
    } else {
      const restBooked = [];
      return res.status(200).json({ restBooked, range, vendorPhonenumber });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send(error.message);
  }
};
export const date_Booking = async (req, res) => {
  try {
    const {
      dateobj,
      time,
      restaurantId,
      orderID,
      menuItems,
      user,
      Total,
      payer,
      data,
    } = req.body;
    console.log(req.body);
    console.log(restaurantId);
    console.log(orderID, menuItems, user, Total, payer, data);
    const userId = user.userId;
    const restaurant = await RESTAURANT.findOne({ _id: restaurantId });
    const bookedRest = await SLOTS.findOne({ restaurantId: restaurantId });
    const Order = await BOOKINGS.create({
      menuItems: menuItems,
      totalAmount: Total,
      bookedDate: dateobj,
      paymentMethod: "paypal",
      TransactionDetails: data,
      restaurantId: restaurantId,
      userId: userId,
      timeSlot: time,
    });
    if (bookedRest) {
      if (bookedRest?.bookedDates.length) {
        console.log(1111111);
        const changedObj = bookedRest.bookedDates.filter((item) => {
          if (item.date === dateobj.date) {
            console.log(2222222);
            const number = parseInt(item.obj[time]) + parseInt(dateobj.number);
            console.log(number);
            if (
              item.obj[time] < restaurant.seatingcapacity &&
              number <= restaurant.seatingcapacity
            ) {
              item.obj[time] = number;
              return item;
            }
          }
        });
        if (changedObj.length) {
          await SLOTS.findOneAndUpdate(
            { restaurantId: restaurantId },
            { $pull: { bookedDates: { _id: changedObj[0]._id } } },
            { new: true }
          );
          const added = await SLOTS.findOneAndUpdate(
            { restaurantId: restaurantId },
            { $push: { bookedDates: changedObj } },
            { new: true }
          );
          await bookedRest.save();
          console.log(555555);
          return res.status(200).json({ Order });
        } else {
          const bookings = {
            date: "",
            obj: {},
          };
          const startTime = restaurant.openinghours;
          const closeTime = restaurant.closinghours;
          const range = getTimeStops(startTime, closeTime);
          const rangeObj = convertToObject(range);
          rangeObj[time] = parseInt(dateobj.number);
          bookings.date = dateobj.date;
          bookings.obj = rangeObj;
          console.log(bookings);
          bookedRest.bookedDates.push(bookings);
          await bookedRest.save();
          console.log(66666661);
          return res.status(200).json({ Order });
        }
      } else {
        const bookings = {
          date: "",
          obj: {},
        };
        const startTime = restaurant.openinghours;
        const closeTime = restaurant.closinghours;
        const range = getTimeStops(startTime, closeTime);
        const rangeObj = convertToObject(range);
        rangeObj[time] = parseInt(dateobj.number);
        bookings.date = dateobj.date;
        bookings.obj = rangeObj;
        console.log(bookings);
        bookedRest.bookedDates.push(bookings);
        await bookedRest.save();
        console.log(bookedRest.bookedDates[0]);
        console.log(6666666);
        return res.status(200).json({ Order });
      }
    } else {
      const bookedDates = [];
      const bookings = {
        date: "",
        obj: {},
      };
      const startTime = restaurant.openinghours;
      const closeTime = restaurant.closinghours;
      const range = getTimeStops(startTime, closeTime);
      const rangeObj = convertToObject(range);
      rangeObj[time] = parseInt(dateobj.number);
      bookings.date = dateobj.date;
      bookings.obj = rangeObj;
      bookedDates.push(bookings);
      console.log(bookedDates);
      console.log(bookings);
      console.log(77777777);
      const bookedRest = await SLOTS.create({
        bookedDates: bookedDates,
        restaurantId: restaurantId,
      });
      return res.status(200).json({ Order });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send(error.message);
  }
};

export const add_new_address = async (req, res) => {
  try {
    const address = req.body.address;
    const userid = req.body.userid;
    const user = await USER.findOne({ _id: userid });
    user?.address.push(address);
    await user.save();
    const User = await USER.findOne({ _id: userid });
    return res.status(200).json(User);
  } catch (error) {
    console.log(error);
    return res.status(401).send(error.message);
  }
};
export const update_User = async (req, res) => {
  try {
    const { firstname, lastname, phonenumber, userid } = req.body;
    console.log(firstname, lastname, phonenumber, userid);
    const user = await USER.findOneAndUpdate(
      { _id: userid },
      {
        $set: {
          "firstname":firstname,
         "lastname": lastname,
         "phonenumber": phonenumber
        }
      },
      { new: true }
    );
    console.log(user);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(401).send(error.message);
  }
};
export const dele_Address = async (req, res) => {
  try {
    console.log(req.body);
    const { idx, userid } = req.body;
    console.log(idx, typeof userid);
    const user = await USER.findOne({ _id: userid });
    user.address.splice(idx, 1);
    await user.save();
    const User = await USER.findOne({ _id: userid });
    return res.status(200).json(User);
  } catch (error) {
    console.log(error);
    return res.status(401).send(error.message);
  }
};
export const update_Password = async (req, res) => {
  try {
    console.log(req.body);
    const { password, userid } = req.body;
    const oldPassword = password.password;
    let newPassword = password.newpassword;
    console.log(oldPassword, newPassword);
    const user = await USER.findOne({ _id: userid });
    if (user) {
      const iscorrectPassword = await bcrypt.compare(
        oldPassword,
        user.password
      );
      if (iscorrectPassword) {
        console.log(12345);
        newPassword = await bcrypt.hash(newPassword, 10);
        await USER.findOneAndUpdate(
          { _id: userid },
          { $set: { password: newPassword } },{new:true}
        );
        console.log(111111);
        return res.status(200).json("Password change successfully");
      } else {
        throw new Error("Wrong password");
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send(error.message);
  }
};

export const all_User_Bookings = async  (req,res)=>{
    try {
       const userid = req.params.id;
       const bookings = await BOOKINGS.find({userId:userid});
       console.log(bookings);
       return res.status(200).json(bookings)
     
    } catch (error) {
        console.log(error);
        return res.status(401).send(error.message);
    }
}