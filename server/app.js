import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import User from "./Routes/userRoutes.js";
import Admin from "./Routes/adminRoutes.js";
import Vendor from "./Routes/vendorRoutes.js";



const app = express();
app.use(express.json())
dotenv.config();
app.use(cors());
app.use(bodyparser.json({limit:"30mb",extended:"true"}))
app.use(bodyparser.urlencoded({limit:"30mb",extended:"true"}));
app.use('/',User);
app.use('/admin',Admin);
app.use('/vendor',Vendor);



mongoose.connect(process.env.MONGO_DB).then((result)=>{
    app.listen(3001);
    console.log("db connected")
    }).catch((err)=>{
    console.log(err);
    })
    mongoose.set('strictQuery',false);
