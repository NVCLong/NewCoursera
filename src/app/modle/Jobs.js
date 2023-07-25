const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Jobs = new Schema({
  name: { type: String, minLength: 8, maxLength: 200, require: true },
  description: { type: String, minLength: 30, maxLength: 600, require: true },
  company: { type: String, minLength: 8, maxLength: 200, require: true },
  requirement: { type: String, minLength: 8, maxLength: 200 },
  salary: { type: String },
  userupload: { type: Boolean, default: false },
  slug: { type: String, maxLength: 200 },
});
Jobs.pre('save', function (next) {
  this.slug = slugify(this.name);
  next();
});
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}
module.exports = mongoose.model('Jobs', Jobs);
