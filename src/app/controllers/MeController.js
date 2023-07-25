const Course = require('../modle/Course');
const until = require('../../until/Mongoose');

const MeController = {
  //[GET] /me/stored/courses
  async stored(req, res) {
    await Course.find({ userupload: true })
      .then(function (courses) {
        res.render('me/storedCourse', {
          course: until.multipleMongooseToObject(courses),
        });
      })
      .catch(function (e) {
        console.log(e);
      });
  },
};
module.exports = MeController;
