import mongoose from 'mongoose';
import { stringify } from 'urlencode';
import bcrypt from 'bcrypt';




const userSchema = new mongoose.Schema({

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
    password:{
        type:String,
        required:[true,'please enter a password'],
        minlength:[6,'min length is 6 character']
    },
    phonenumber:{
        type:Number,
        required:[true,'please enter a phonenumber'],
    
        minlength:[10,'please enter a valid phonenumber']
    },
    address:{
        type:Array,
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    isVerified:{
        type:Boolean,
        default:false

    },
    cart:{
        type:Array
    },
    whislist:{
        type:Array

    }

}) 


const User = mongoose.model('users',userSchema);

export default User;