const News = require('../modle/News');
const Jobs = require('../modle/Jobs');
const Cv= require('../modle/CV')
const until = require('../../until/Mongoose');

class NewController {
  // [GET]  /news
  async tech(req, res) {
    try {
      await News.find().then(function (news) {
        res.render('news/tech', { news: until.multipleMongooseToObject(news) });
      });
    } catch (e) {
      res.status(400).json('error');
    }
  }

  // [GET} /news/:slug
  async job(req, res) {
    try {
      await Jobs.find().then(function (news) {
        res.render('news/job', { news: until.multipleMongooseToObject(news) });
      });
    } catch (e) {
      res.status(400).json('error');
    }
  }

  //[GET] /news/create
  async create(req, res) {
    try {
      res.render('news/create');
    } catch (e) {
      res.status(401).json(e);
    }
  }

  // [POST] /news/store
  async store(req, res) {
    try {
      const newArticle = new News({
        title: req.body.title,
        body: req.body.body,
        image: req.body.image,
        author: req.body.author,
        userupload: true,
      });
      newArticle.save().then(function () {
        res.redirect('/news/job');
      });
    } catch (e) {
      res.status(401).json(e);
    }
  }

  //[GET] /news/my_news
  async show(req, res) {
    try {
      News.find({ userupload: 'true' }).then(function (news) {
        res.render('news/news', { news: until.multipleMongooseToObject(news) });
      });
    } catch (e) {
      res.status(404).json(e);
    }
  }

  //[GET] /news/:id/edit
  async edit(req, res) {
    try {
      News.findById(req.params.id).then(function (news) {
        res.render('news/newsEdit', { news: until.mongooseToObject(news) });
      });
    } catch (e) {
      res.status(401).json(e);
    }
  }

  // [PUT] /news/:id
  async save(req, res) {
    try {
      News.updateOne({ _id: req.params.id }, req.body)
        .then(function () {
          res.redirect('/news/my_news');
        })
        .catch(function (reason) {
          res.json(reason);
        });
    } catch (e) {
      res.status(404).json(e);
    }
  }

  //[DELETE] /news/:id
  async delete(req, res) {
    try {
      await News.deleteOne({ _id: req.params.id })
        .then(function () {
          res.redirect('back');
        })
        .catch(function (e) {
          res.status(401).json(e);
        });
    } catch (e) {
      res.status(401).json(e);
    }
  }

  //[GET] /news/jobs/:slug
  async details(req, res) {
    try {
      await Jobs.findOne({ slug: req.params.slug })
        .then(function (job) {
          res.render('news/detail', { job: until.mongooseToObject(job) });
        })
        .catch(function (reason) {
          res.status(404).json(e);
        });
    } catch (e) {
      res.status(401).json(e);
    }
  }

  //[GET] /news/:id/editJob
  async jobEdit(req, res) {
    try {
      await Jobs.findById(req.params.id)
        .then(function (job) {
          res.render('news/jobsEdit', { job: until.mongooseToObject(job) });
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
      res.status(401).json({ msg: ' error' });
    }
  }

  //[PUT] /news/jobs/:id
  async jobStore(req, res) {
    try {
      await Jobs.updateOne({ _id: req.params.id }, req.body)
        .then(function () {
          res.redirect('/admin/jobs');
        })
        .catch(function (e) {
          console.log(e);
          res.json({ e: e });
        });
    } catch (e) {
      console.log(e);
      res.status(401).json({ e: e });
    }
  }

  //[DELETE] /news/jobs/:id
  async deleteJob(req, res){
    try {
      await Jobs.deleteOne({ _id: req.params.id })
          .then(function () {
            res.redirect('back');
          })
          .catch(function (e) {
            res.status(401).json(e);
          });
    } catch (e) {
      res.status(401).json(e);
    }
  }

  //[GET] /news/job/:slug/cv
  async cvForm(req,res){
    try{
      await Jobs.findOne({slug:req.params.slug})
          .then(function (job) {
            res.render('news/cvForm',{job:until.mongooseToObject(job)})
          })

    }catch (e) {
      console.log(e)
      res.json(e)
    }
  }

  //[POST] /news/job/:slug/apply
  async apply(req,res){
    try{
      const currentJob = await  Jobs.findOne({name: req.body.company})
      const userId = req.cookies.userId;

      const cv= await Cv.findOne({userId:userId})

      if(cv){
        let itemIndex=cv.cv.findIndex(function (cv) {
          return cv.company===req.body.company
        })
        if(itemIndex>-1){
          res.json('already exist')
        }else{
          cv.cv.push({
            company: currentJob.name,
            salary: currentJob.salary
          })
        }
        cv.save()
        res.status(200).redirect('/me/cv')
      }else {
        const newCv= await Cv.create({
          userId: userId,
          cv:[{
            company: currentJob.name,
            salary: currentJob.salary
          }],
          name: req.body.name,
          email: req.body.email,
          gender: req.body.gender,
          information: req.body.information

        })
        res.status(200).redirect('/me/cv')
      }


    }catch (e) {
      console.log(e)

    }
  }
}
module.exports = new NewController();
