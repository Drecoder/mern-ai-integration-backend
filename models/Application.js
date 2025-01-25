const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  serialNumber: { type: String, required: true },  // Reference to the job
  firstName: String,
  middleInitial: String,
  lastName: String,
  email: String,
  address: String,
  city: String,
  state: String,
  country: String,
  zipCode: String,
  phoneNumber: String,
  totalExperience: Number,
  willingToRelocate: String,
  submittedAt: { type: Date, default: Date.now },  // Timestamp when the application is submitted
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
