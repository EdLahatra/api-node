const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  pays: {
    type: Schema.Types.ObjectId,
    ref: 'pays',
  },
  vaccin: [
    {
      vaccin: {
        type: Schema.Types.ObjectId,
        ref: 'vaccin',
      },
    },
  ],
  checklist: [
    {
      checklist: {
        type: Schema.Types.ObjectId,
        ref: 'checklist',
      },
    },
  ],
  secours: [
    {
      secours: {
        type: Schema.Types.ObjectId,
        ref: 'secours',
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('users', UserSchema);
