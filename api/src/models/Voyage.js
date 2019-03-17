const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema
const VoyageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  pays: {
    type: Schema.Types.ObjectId,
    ref: 'pays',
  },
  name: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  dateDepart: {
    type: Date,
    default: Date.now,
  },
  dateArrive: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('voyage', VoyageSchema);
