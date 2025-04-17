const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  fatherName: {
    type: String,
    required: true
  },
  registrationNum: {
    type: String,
    required: true
  },
  rollNo: {
    type: String,
    required: true,
    unique: true
  },
  centerName: {
    type: String,
    required: true
  },
  machineName: {
    type: String,
    required: true
  },
  
  proficiencyScore: {
    type: Number,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  completedate: {
    type: Date,
    required: true
  },

  profileimg: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Certificate', certificateSchema);