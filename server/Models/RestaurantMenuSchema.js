import mongoose from "mongoose";
const ObjectId = mongoose.Schema.ObjectId;
const restaurantMenuSchema = new mongoose.Schema({
    starter:{
        type:Array,
    },
    sidedish:{
        type:Array,
    },
    maindish:{
        type:Array,
    },
    combos:{
        type:Array,
    },
    dessert:{
        type:Array,
    },
    beverages:{
        type:Array,
    },
    vendorId:{
        type:ObjectId,
        ref:'Vendors'
    },
    restaurantId:{
        type:ObjectId,
        ref:'Restaurants'
    }
})
const ResturantMenu = mongoose.model('restaurantmenu',restaurantMenuSchema);

export default ResturantMenu;