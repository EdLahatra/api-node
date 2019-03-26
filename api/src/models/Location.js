const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema
const LocationSchema = new Schema({
  longitude: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  heure: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('location', LocationSchema);
