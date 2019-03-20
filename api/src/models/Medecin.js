const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema
const MedecinSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  pays: {
    type: Schema.Types.ObjectId,
    ref: 'pays',
  },
  nom: {
    type: String,
  },
  specialite: {
    type: String,
  },
  telephone: {
    type: String,
  },
  cp: {
    type: String,
  },
  langue: {
    type: String,
  },
  voie: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('medecin', MedecinSchema);
