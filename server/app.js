import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./Routes/userRoutes.js";
import Admin from "./Routes/adminRoutes.js";
import Vendor from "./Routes/vendorRoutes.js";
import cookieParser from 'cookie-parser';
import noCache from 'nocache';
import fileupload from 'express-fileupload';






const app = express();
app.use(express.json())
dotenv.config();
const { MONGO_DB } = process.env;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(noCache());
app.use(fileupload());


const corsOptions= {
  origin:'http://localhost:3000',
  credentials: true,
  optionSuccessStatus:200,
};

app.use(cors(corsOptions));


console.log(MONGO_DB);
mongoose.connect(MONGO_DB).then((result) => {
    app.listen(3001);
    console.log("db connected")
}).catch((err) => {
    console.log(err.message);
})
mongoose.set('strictQuery', false);



app.use('/', User);
app.use('/admin', Admin);
app.use('/vendor', Vendor);

// const errorHandler = (err, req, res, next) => {
//     const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//     res.status(statusCode);
//     res.send({
//       message: err.message,
//     });
//   }
// app.use(errorHandler);