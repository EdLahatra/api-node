const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SejourSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Sejour = mongoose.model('sejour',SejourSchema);
