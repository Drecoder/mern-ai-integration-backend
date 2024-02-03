const mongoose = require('mongoose');

//Schema
const userSchema = new mongoose.Schema({
    userSchema: {   
        type: String,
        required:true,
    },
    emai: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    trialActive: {
        type: Boolean,
        required: true,     
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
