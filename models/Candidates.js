const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: false },
    professionalDetails: {
        fieldOfEngineering: {
            type: String,
            required: true,
            enum: ['Civil', 'Structural', 'Software', 'Electrical', 'Mechanical', 'Other']
        },
        experienceYears: { type: Number, required: true },
        skills: [{ type: String, required: true }],
        certifications: [{ type: String, required: false }]
    },
    education: [{
        institution: { type: String, required: true },
        degree: { type: String, required: true },
        yearOfGraduation: { type: Number, required: true }
    }],
    resume: { type: String, required: false }, // URL or path to resume file
    portfolio: { type: String, required: false }, // URL or path to portfolio
    appliedPositions: [{
        positionTitle: { type: String, required: true },
        appliedDate: { type: Date, default: Date.now },
        status: {
            type: String,
            enum: ['Applied', 'Interviewing', 'Offered', 'Rejected', 'Accepted'],
            default: 'Applied'
        }
    }],
    notes: { type: String, required: false },
    creationDate: { type: Date, default: Date.now }
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;

