const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MaladieSchema = new Schema({
  name: {
    type: String
  },
  sejour: [
    {
      sejour: {
        type: Schema.Types.ObjectId,
        ref: 'sejour'
      }
    }
  ],
  vaccin: [
    {
      vaccin: {
        type: Schema.Types.ObjectId,
        ref: 'vaccin'
      }
    }
  ],
  vaccinSugg: [
    {
      vaccin: {
        type: Schema.Types.ObjectId,
        ref: 'vaccin'
      }
    }
  ],
  medecin: [
    {
      vaccin: {
        type: Schema.Types.ObjectId,
        ref: 'medecin'
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Maladie = mongoose.model('maladie', MaladieSchema);
