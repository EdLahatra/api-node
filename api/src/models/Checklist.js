const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema
const ChecklistSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  commentaire: {
    type: String,
  },
  personnalisation: {
    type: String,
  },
  ordre: {
    type: Number,
    unique: false,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value',
    },
  },
  categorie: {
    type: Schema.Types.ObjectId,
    ref: 'categorie',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('checklist', ChecklistSchema);
