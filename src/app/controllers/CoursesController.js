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
}
module.exports = new CoursesController();
