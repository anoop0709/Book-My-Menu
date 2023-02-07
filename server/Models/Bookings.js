import mongoose from "mongoose";
const ObjectId = mongoose.Schema.ObjectId;


const Bookings = new mongoose.Schema({
    menuItems: {
        type: Array,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    bookedDate: {
        type: Object,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    TransactionId: {
        type: String
    },
    restaurantId: {
        type: ObjectId,
        ref: 'Restaurants'
    },
    userId:{
        type:ObjectId,
        ref: 'Users'
    }
})