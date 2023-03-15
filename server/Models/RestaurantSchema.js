import mongoose from "mongoose"
const ObjectId = mongoose.Schema.ObjectId;
const restaurantSchema = new mongoose.Schema({
    restaurantname:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    typeofcusine:{
        type:String,
        uppercase:true,
        required:true
    },
    seatingcapacity:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    openinghours:{
        type:String,
        required:true
    },
    closinghours:{
        type:String,
        required:true
    },
    images:{
        type:Array,
        required:true
    },
    pancard:{
        type:String,
        required:true
    },
    fssai:{
        type:String,
        required:true
    },
    gst:{
        type:String,
        required:true
    },
    rating:{
        type:Array,
    },
    description:{
        type:String,
        required:true,
    },
    menutype:{
        type:String,
        uppercase:true,
        required:true
    },
    review:{
        type:Array,
    },
    vendorId:{
        type:ObjectId,
        ref:'Vendors'
    },
    phonenumber:{
        type:Number,
        required:true
    }

})

const Resturant = mongoose.model('restaurants',restaurantSchema);

export default Resturant;