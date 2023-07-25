const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
      minLength: 8,
      maxLength: 40,
    },
    password: { type: String, require: true, minLength: 8, maxLength: 20000 },
    email: { type: String, require: true },
    admin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Users', Users);
