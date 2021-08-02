const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    compName:{
        type:String,
        required:true,
        min:3,
        max:255
    },
    compEmail:{
        type:String,
        required:true,
        min:3,
        max:255
    },
    compAddress:{
        type:String,
        required:true,
        min:3,
        max:255
    },
    compStocks:{
        type:Number
    },
    UserId:{
        type:String
    }
});

module.exports = mongoose.model('Company', companySchema);