import mongoose from "mongoose";
const ObjectId = mongoose.Schema.ObjectId;


const BookedDates = new mongoose.Schema({

    restaurantId:{
        type:ObjectId,
        required:true,
        ref:'Restaurants'
    },
    bookedDates:{
        type:Array
    }


})
const bookedDates = mongoose.model('bookeddates',BookedDates);

export default bookedDates;