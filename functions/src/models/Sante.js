const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SanteSchema = new Schema({
  name: {
    type: String
  },
  poit: {
    type: String
  },
  vaccin: [
    {
      vaccin: {
        type: Schema.Types.ObjectId,
        ref: 'vaccin'
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Sante = mongoose.model('sante', SanteSchema);
