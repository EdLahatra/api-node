const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SejourSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  isQuestion: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('sejour',SejourSchema);
