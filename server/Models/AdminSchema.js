import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:true
    }

})

const Admin = mongoose.model('admin',adminSchema);

export default Admin;