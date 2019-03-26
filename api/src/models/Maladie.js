const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema
const MaladieSchema = new Schema({
  label: {
    type: String,
  },
  value: {
    type: String,
  },
  name: {
    type: String,
  },
  sejour: [
    {
      sejour: {
        type: Schema.Types.ObjectId,
        ref: 'sejour',
      },
    },
  ],
  vaccin: [
    {
      vaccin: {
        type: Schema.Types.ObjectId,
        ref: 'vaccin',
      },
    },
  ],
  vaccinSugg: [
    {
      vaccin: {
        type: Schema.Types.ObjectId,
        ref: 'vaccin',
      },
    },
  ],
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('maladie', MaladieSchema);
