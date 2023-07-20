const Course= require('../modle/Course')
const until=require('../../until/Mongoose')

class CoursesController {
    // [GET} /courses/:slug
    async show(req, res) {
           try{
           await Course.findOne({slug:req.params.slug})
                .then(function (courses){
                    courses=until.mongooseToObject(courses)
                    res.render('courses/show',{courses: courses});
                })
            }catch (e){
                res.status(400).json("error "+ req.params.slug)
            }
    }
    async courses(req, res){
            try {
                const data=await Course.find()
                    .then((courses)=>{
                        courses=until.multipleMongooseToObject(courses)
                        res.render('courses',{courses: courses})
                    })
            }catch (e){
                res.status(400).json("error")
            }
    }
    async create(req,res){
        res.render('courses/createForm')
    }

    async store(req,res){
        // res.json(req.body)
        const newCourse= new Course(req.body)
        await newCourse.save()
            .then(function () {
                res.redirect('http://localhost:3000/courses')
            })

    }
}
module.exports = new CoursesController();
