const User = require('../modle/User');
const Course = require('../modle/Course');
const { multipleMongooseToObject } = require('../../until/Mongoose');
const News = require('../modle/News');
const Jobs = require('../modle/Jobs');

class AdminController {
  //[GET] /admin
  adminPage(req, res) {
    res.render('admin/adminPage');
  }

  //[GET] /admin/courses
  async adminCourse(req, res) {
    try {
      await Course.find().then(function (courses) {
        res.render('admin/adminCourse', {
          courses: multipleMongooseToObject(courses),
        });
      });
    } catch (e) {
      console.log(e);
      res.status(401).json(e);
    }
  }

  //[GET] /admin/article
  async adminArticle(req, res) {
    try {
      await News.find().then(function (news) {
        res.render('admin/adminArticle', {
          news: multipleMongooseToObject(news),
        });
      });
    } catch (e) {
      console.log(e);
      res.status(401).json(e);
    }
  }
  //[GET] /admin/user

  async adminUser(req, res) {
    try {
      await User.find().then(function (users) {
        res.render('admin/adminUser', {
          users: multipleMongooseToObject(users),
        });
      });
    } catch (e) {
      console.log(e);
      res.status(401).jsone(e);
    }
  }

  //[GET] /admin/jobs
  async adminJobs(req, res) {
    try {
      await Jobs.find().then(function (jobs) {
        res.render('admin/adminJobs', { jobs: multipleMongooseToObject(jobs) });
      });
    } catch (e) {
      console.log(e);
      res.status(401).json(e);
    }
  }
}
module.exports = new AdminController();
