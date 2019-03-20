const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema
const VaccinSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('vaccin', VaccinSchema);
