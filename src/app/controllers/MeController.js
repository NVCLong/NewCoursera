const Course = require('../modle/Course');
const until = require('../../until/Mongoose');
const Cart = require('../modle/Cart');
const Cv= require('../modle/CV')
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
    async myCv(req, res){
      await Cv.find({userId: req.cookies.userId})
          .then(function(cv){
              res.render('me/appliedCv',{cvs: until.multipleMongooseToObject(cv)})
          })
          .catch(function (reason) {
              console.log(reason)
          })
    },

    //[GET] /me/cv/:id
    async editCv(req,res){
      try{
          await Cv.findOne({userId: req.cookies.userId})
              .then(function (cv) {
                  res.render('me/editCv',{cv:until.mongooseToObject(cv)})
              })
              .catch(function(reason){
                  console.log(reason)
              })
      }catch (e) {
          console.log(e)
          res.json({e:e})
      }
    }


};



module.exports = MeController;
