const Course = require('../modle/Course');
const until = require('../../until/Mongoose');
const Cart= require("../modle/Cart")

class CoursesController {
  // [GET} /courses/:slug
  async show(req, res) {
    try {
      await Course.findOne({ slug: req.params.slug }).then(function (courses) {
        courses = until.mongooseToObject(courses);
        res.render('courses/show', { courses: courses });
      });
    } catch (e) {
      res.status(400).json('error ' + req.params.slug);
    }
  }

  //[GET] /courses
  async courses(req, res) {
    try {
      const data = await Course.find().then((courses) => {
        courses = until.multipleMongooseToObject(courses);
        res.render('courses', { courses: courses });
      });
    } catch (e) {
      res.status(400).json('error');
    }
  }
  //[GET] /courses/loginForm
  async create(req, res) {
    res.render('courses/createForm');
  }

  //[POST] /courses/store
  async store(req, res) {
    try {
      // res.json(req.body)
      const newCourse = new Course({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        vidId: req.body.vidId,
        userupload: true,
      });
      await newCourse.save().then(function () {
        res.redirect('http://localhost:3000/courses');
      });
    } catch (e) {
      res.status(400).json(e);
    }
  }
  async edit(req, res) {
    try {
      await Course.findById(req.params.id).then((courses) => {
        courses = until.mongooseToObject(courses);
        res.render('courses/edit', { courses: courses });
      });
    } catch (e) {
      res.status(400).send(e);
    }
  }

  //[PUT]  /courses/:id
  async update(req, res) {
    try {
      //update using Course.updateOne( condition, changes)
      await Course.updateOne({ _id: req.params.id }, req.body)
        .then(function () {
          res.redirect('/me/stored/courses');
        })
        .catch(function (reason) {
          res.status(401).json(reason);
        });
    } catch (e) {
      res.status(401).json(e);
    }
  }
  async delete(req, res) {
    try {
      await Course.deleteOne({ _id: req.params.id })
        .then(function () {
          res.redirect('back');
        })
        .catch(function (reason) {
          res.json(reason);
        });
    } catch (e) {
      res.status(401).json(e);
    }
  }

  //[GET] /courses/:id
  async addToCart(req,res){
    try{
      await Course.findById(req.params.id)
          .then(async function (course) {
            const addCourse = {
              name: course.name,
              vidId: course.vidId,
              slug: course.slug
            }
            const userId = req.cookies.userId
            try {
              let cart = await Cart.findOne({userId: userId});

              if (cart) {
                //cart exists for user
                let itemIndex = cart.products.findIndex(function (course) {
                  return course.slug === addCourse.slug
                });

                if (itemIndex > -1) {
                  //product exists in the cart, update the quantity
                  res.json("already exist")
                } else {
                  //product does not exist in cart, add new item
                  cart.products.push(addCourse);
                }
                cart = cart.save();
                 res.status(200).redirect('/');
              } else {
                //no cart for user, create new cart
                const newCart = Cart.create({
                  userId,
                  products: [addCourse]
                });

                 res.status(200).redirect('/me/stored/courses');
              }
            } catch (err) {
              console.log(err);
              res.status(500).json("error : " + err);
            }
          })
    }catch (e) {
      res.json( e)
    }
  }



}
module.exports = new CoursesController();
