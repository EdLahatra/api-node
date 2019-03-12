const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SanguinSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Sanguin = mongoose.model('sanguin',SanguinSchema);
