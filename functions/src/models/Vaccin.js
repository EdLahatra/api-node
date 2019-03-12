const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const VaccinSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Vaccin = mongoose.model('vaccin',VaccinSchema);
