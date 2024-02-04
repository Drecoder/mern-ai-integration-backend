const mongoose = require('mongoose');

//Schema
const userSchema = new mongoose.Schema({
    username: {   
        type: String,
        required:true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    trialPeriods: { 
        type: Number,
        default: 3, //3 days
    },
    trialActive: {
        type: Boolean,
        required: true,   
        default: false,
    },
    trialExpires: {
        type: Date,
    },
    subscription: {
        type: String,
        enum:['Trial', 'Free', 'Basic', 'Premium'],
    },
    apiRequestCount:{
        type: Number,
        defaut: 0,
    },  
    monthlyuRequestCount:{
        type: Number,
        defaut: 0,
    },
    nextBillingDate: Date,
    payments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Payment',
        },
    ],
    history: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'History',
        },
    ],
}, {
    timestamps: true,
});

//! Compile to form the model
const User = mongoose.model('User', userSchema);

module.exports = User;
