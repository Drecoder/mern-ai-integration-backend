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
        default: true,
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
        default: 0,
    },  
    monthlyRequestCount:{
        type: Number,
        default: 6, // 100 requests // 3 days   
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
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
    }
);

// Add Virtual property to the userSchema
userSchema.virtual('isTrialActive').get(function() {
    return this.trialActive && new Date() < this.trialExpires;
}); // Add the logic to check if the trial is active
//! Compile to form the model
const User = mongoose.model('User', userSchema);

module.exports = User;
