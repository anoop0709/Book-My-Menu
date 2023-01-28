import mongoose from "mongoose";
const { MONGO_DB } = process.env;

mongoose.connect(MONGO_DB).then((result) => {
    console.log("db connected")
}).catch((err) => {
    console.log(err.message);
})
mongoose.set('strictQuery', false);
