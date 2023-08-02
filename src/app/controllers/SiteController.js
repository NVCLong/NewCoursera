const Course = require('../modle/Course');
const until = require('../../until/Mongoose');

class SiteController {
  // [GET]  /home
  async home(req, res) {
    try {
      const data = await Course.find().then((courses) => {
        courses = until.multipleMongooseToObject(courses);
        res.render('home', { courses: courses });
      });
    } catch (e) {
      res.status(400).json('error');
    }
  }
  // [GET} /search

  async search(req, res) {
    try{
      Course.find({keyword: { $regex: req.body.name.toLowerCase() }})
          .then(function (courses) {
            // res.json({courses:courses})
            res.render('search',{courses:until.multipleMongooseToObject(courses)})
          })
          .catch(function (reason) {
            console.log(reason)
            res.json({msg:"error"})
          })
    }catch(e){
      console.log(e)
      res.json({e:e})
    }
  }
}
module.exports = new SiteController();
