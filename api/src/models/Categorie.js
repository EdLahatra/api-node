const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema
const CategorieSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('categorie', CategorieSchema);
