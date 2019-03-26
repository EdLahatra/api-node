const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema
const PaysSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  capital: {
    type: String,
  },
  indicatifPhone: {
    type: String,
  },
  decalageHoraore: {
    type: String,
  },
  monnaie: {
    type: String,
  },
  permis: {
    type: String,
  },
  prise: {
    type: String,
  },
  eau: {
    potable: {
      type: Boolean,
      default: false,
    },
    commentaire: {
      type: String,
    },
  },
  maladie: [
    {
      maladie: {
        type: Schema.Types.ObjectId,
        ref: 'maladie',
      },
    },
  ],
  centre: [
    {
      centre: {
        type: Schema.Types.ObjectId,
        ref: 'centre',
      },
    },
  ],
  medecin: [
    {
      medecin: {
        type: Schema.Types.ObjectId,
        ref: 'medecin',
      },
    },
  ],
  urgence: [
    {
      urgence: {
        type: Schema.Types.ObjectId,
        ref: 'urgence',
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('pays', PaysSchema);
