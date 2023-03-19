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
    TransactionDetails: {
        type: Object
    },
    restaurantId: {
        type: ObjectId,
        ref: 'Restaurants'
    },
    userId:{
        type:ObjectId,
        ref: 'Users'
    },
    timeSlot:{
        type:String,
        required:true
    },
    cancelled:{
        type:Boolean,
        default:false
    }
})
const bookings = mongoose.model('bookings',Bookings);

export default bookings;