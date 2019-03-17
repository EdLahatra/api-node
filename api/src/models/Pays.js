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
    required: true,
  },
  indicatifPhone: {
    type: String,
    required: true,
  },
  decalageHoraore: {
    type: String,
    required: true,
  },
  monnaie: {
    type: String,
    required: true,
  },
  permis: {
    type: String,
    required: true,
  },
  maladie: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'maladie',
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('pays', PaysSchema);
