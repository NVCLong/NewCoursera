module.exports = {
  multipleMongooseToObject: function (mongooseArray) {
    return mongooseArray.map(function (course) {
      return course.toObject();
    });
  },
  mongooseToObject: function (mongooses) {
    return mongooses.toObject();
  },
  slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '_') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '_') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  },
};
