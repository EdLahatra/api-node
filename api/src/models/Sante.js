const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema
const SanteSchema = new Schema({
  problemeSantePasse: {
    type: String,
  },
  problemeSanteEncours: {
    type: String,
  },
  poids: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  sanguin: {
    type: Schema.Types.ObjectId,
    ref: 'sanguin',
  },
  allergie: {
    type: Schema.Types.ObjectId,
    ref: 'allergie',
  },
  naissance: {
    type: Date,
    default: Date.now,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('sante', SanteSchema);
