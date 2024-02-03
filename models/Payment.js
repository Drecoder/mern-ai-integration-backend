const mongoose = require('mongoose');

//Schema
const paymentSchema = new mongoose.Schema(
{
    user: {   
        type: mongoose.Schema.Types.ObjectId,     
        ref: 'User',
    },
    reference:{
        type: String,
        required: true,
    },
    currence: {
        type: String,
        required: true,
    },
    status: {
        type: string,
        default: 'pending',
        required: true,     
    },
    subscriptionPlan: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        default: 0,
    },
    monthlyuRequestCount:{
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

//! Compile to form the model
const User = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
