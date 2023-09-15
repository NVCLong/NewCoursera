const mongoose = require('mongoose');

const CvSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    cv: [
      {
        company: String,
        salary: String,
      },
    ],
    name: String,
    email: String,
    gender: String,
    information: String,
    active: {
      type: Boolean,
      default: true,
    },
    modifiedOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Cv', CvSchema);
