const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema
const AllergieSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('allergie', AllergieSchema);
