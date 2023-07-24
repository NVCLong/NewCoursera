
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

  //[GET] /news/mynews
  async show(req,res){
      try{
          News.find()
              .then(function (news) {
                  res.render('news/news',{news:until.multipleMongooseToObject(news)})
              })
      }catch(e){
          res.status(404).json(e)
      }

  }

  //[GET] /news/:id/edit
    async edit(req,res){
      try{
          News.findById(req.params.id)
              .then(function (news) {
                  res.render('news/newsEdit',{news:until.mongooseToObject(news)})
              })

      }catch (e) {
          res.status(401).json(e)
      }
    }
   // [PUT] /news/:id
   async save(req,res){
      try{
          News.updateOne({_id:req.params.id},req.body)
              .then(function () {
                  res.redirect('/news/my_news')
              })
              .catch(function (reason) {
                  res.json(reason)
              })
      }catch (e) {
          res.status(404).json(e)
      }
   }


  //[DELETE] /news/:id
  async delete(req,res){
      try{
          await News.deleteOne({_id:req.params.id})
              .then(function () {
                  res.redirect('back')
              })
              .catch(function (e) {
                  res.status(401).json(e)
              })
      }catch (e) {
          res.status(401).json(e)
      }
  }
}
module.exports = new NewController();
