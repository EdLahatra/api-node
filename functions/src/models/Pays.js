const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PaysSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Pays = mongoose.model('pays',PaysSchema);
