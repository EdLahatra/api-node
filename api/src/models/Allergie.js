const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema
const AllergieSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  categorie: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('allergie', AllergieSchema);
