import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import User from "./Routes/userRoutes.js";
import Admin from "./Routes/adminRoutes.js";
import Vendor from "./Routes/vendorRoutes.js";
import cookieParser from 'cookie-parser';
import noCache from 'nocache';
import fileupload from 'express-fileupload';
import "./config/DatabaseConfig.js"
import {corsOptions} from "./config/CorsConfig.js"

const app = express();


dotenv.config();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(noCache());
app.use(fileupload());
app.use(cors(corsOptions));
app.listen(process.env.PORT);


app.use('/', User);
app.use('/admin', Admin);
app.use('/vendor', Vendor);

