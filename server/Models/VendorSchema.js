import mongoose from "mongoose";


const vendorSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,'please enter your  First name']
    },
    lastname:{
        type:String,
        required:[true,'please enter your  Last name']
    },
    email:{
        type:String,
        required:[true,'please enter your Email'],
        unique:true,
        tolowecase:true,
       
    },
    phonenumber:{
        type:Number,
        required:[true,'please enter a phonenumber'],
    
        minlength:[10,'please enter a valid phonenumber']
    },
    password:{
        type:String,
        required:[true,'please enter a password'],
        minlength:[6,'min length is 6 character']
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    isApproved:{
        type:Boolean,
        default:false
    },
})

const Vendor = mongoose.model('vendors',vendorSchema);

export default Vendor;