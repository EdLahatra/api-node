const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UrgenceSchema = new Schema({
  pays: {
    type: Schema.Types.ObjectId,
    ref: 'pays'
  },
  service: {
    type: String
  },
  numero: {
    type: String
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Urgence = mongoose.model('urgence',UrgenceSchema);
