
const News=require('../modle/News')
const until=require('../../until/Mongoose')

class NewController {
  // [GET]  /news
  async tech(req, res) {
    try{
      await News.find()
          .then(function (news){
            res.render('news/job',{news:until.multipleMongooseToObject(news)})
          })

    }catch(e){
      res.status(400).json("error")
    }
    res.render('news/tech');
  }
  // [GET} /news/:slug

  async job(req, res) {
    try{
      await News.find()
          .then(function (news){
            res.render('news/job',{news:until.multipleMongooseToObject(news)})
          })

    }catch(e) {
      res.status(400).json(error)
    }
  }
}
module.exports = new NewController();
