import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.ObjectId;

const walletSchema = new mongoose.Schema({
    accountname:{
        type:String,
        required:true
    },
    cardnumber:{
        type:String,
        required:true
    },
    balance:{
        type:Number,
        required:true
    },
    transactions:[
        {
        transactionType:"string",
        amount:"number",
        }
    ],
    userId:{
        type:ObjectId,
        ref:'Users'
    }

})

const Wallet = mongoose.model('wallet',walletSchema);

export default Wallet;