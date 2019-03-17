const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema
const CentreSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  service: {
    type: String,
  },
  numero: {
    type: String,
  },
  rue: {
    type: String,
  },
  cp: {
    type: String,
  },
  ville: {
    type: String,
  },
  telephone: {
    type: String,
  },
  email: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('centre', CentreSchema);
