const Course= require('../modle/Course')
const until=require('../../until/Mongoose')

class SiteController {
  // [GET]  /home
  async home(req, res) {
    try {
      const data=await Course.find()
          .then((courses)=>{
              courses=until.multipleMongooseToObject(courses)
              res.render('home',{courses: courses})
          })
    }catch (e){
      res.status(400).json("error")
    }
  }
  // [GET} /search

  search(req, res) {
    res.render('search');
  }
}
module.exports = new SiteController();
