const Course = require('../modle/Course');
const User = require('../modle/User');
const until = require('../../until/Mongoose');
const Cart = require('../modle/Cart');
const Cv = require('../modle/CV');
const Avatar = require('../modle/Image');
const multer = require('multer');
const { mongooseToObject } = require('../../until/Mongoose');

// Storage for images
const Storage = multer.diskStorage({
  destination: './src/public/img/avatars',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: Storage,
}).single('avatar');
const MeController = {
  //[GET] /me/stored/courses
  async stored(req, res) {
    await Cart.find({ userId: req.cookies.userId })
      .then(function (courses) {
        res.render('me/storedCourse', {
          course: until.multipleMongooseToObject(courses),
        });
      })
      .catch(function (e) {
        console.log(e);
      });
  },
  // [GET] /me/cv
  async myCv(req, res) {
    await Cv.find({ userId: req.cookies.userId })
      .then(function (cv) {
        res.render('me/appliedCv', { cvs: until.multipleMongooseToObject(cv) });
      })
      .catch(function (reason) {
        console.log(reason);
      });
  },

  //[GET] /me/cv/:id
  async editCv(req, res) {
    try {
      await Cv.findOne({ userId: req.cookies.userId })
        .then(function (cv) {
          res.render('me/editCv', { cv: until.mongooseToObject(cv) });
        })
        .catch(function (reason) {
          console.log(reason);
        });
    } catch (e) {
      console.log(e);
      res.json({ e: e });
    }
  },

  //[GET] /me/profile/:id

  async profile(req, res) {
    await User.findOne({ _id: req.cookies.userId })
      .then(function (user) {
        res.render('me/profile', { user: mongooseToObject(user) });
      })
      .catch(function (reason) {
        console.log(reason);
        res.status(404).json({ reason: reason });
      });
  },

  //[POST] /me/avatar/:id

  async avatar(req, res) {
    upload(req, res, (err) => {
      if (err) {
        console.log(err);
      } else {
        const newAvatar = new Avatar({
          userId: req.body.userId,
          image: {
            data: req.file.filename,
            contentType: 'image/png',
          },
          name: req.body.filename,
        });
        newAvatar
          .save()
          .then(function () {
            res.redirect('/me/profile');
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    });
  },
};

module.exports = MeController;
