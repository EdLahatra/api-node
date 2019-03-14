const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MedecinSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Medecin = mongoose.model('medecin', MedecinSchema);
