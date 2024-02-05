const mongoose = require('mongoose');

const prospectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: false
    },
    linkedInProfile: {
        type: String,
        required: false
    },
    company: {
        name: {
            type: String,
            required: true
        },
        industry: {
            type: String,
            required: false
        },
        size: {
            type: Number,
            required: false
        },
        website: {
            type: String,
            required: false
        }
    },
    interests: {
        type: [String],
        required: false
    },
    notes: {
        type: String,
        required: false
    },
    addedDate: {
        type: Date,
        default: Date.now
    }
});

const Prospect = mongoose.model('Prospect', prospectSchema);

module.exports = Prospect;
