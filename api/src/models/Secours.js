const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema
const SecoursSchema = new Schema({
  name: {
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

export default mongoose.model('secours', SecoursSchema);
