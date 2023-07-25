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
        try {
            // res.json(req.body)
            const newCourse = new Course({
                name: req.body.name,
                description: req.body.description,
                image: req.body.image,
                vidId: req.body.vidId,
                userupload:true,
            })
            await newCourse.save()
                .then(function () {
                    res.redirect('http://localhost:3000/courses')
                })
        }catch (e){
            res.status(400).json(e)
        }

    }
    async edit(req,res){
        try {
                await Course.findById(req.params.id)
                .then((courses)=>{
                    courses=until.mongooseToObject(courses)
                    res.render('courses/edit',{courses: courses})
                })
        }catch (e){
            res.status(400).send(e)
        }

    }

    //[PUT]  /courses/:id
    async update(req,res){
        try{
            //update using Course.updateOne( condition, changes)
            await Course.updateOne({_id:req.params.id},req.body)
                .then(function (){
                    res.redirect('/me/stored/courses')
                })
                .catch(function (reason) {
                    res.status(401).json(reason)
                })

        }catch(e){
            res.status(401).json(e)
        }
    }
    async delete(req,res){
        try{
            await Course.deleteOne({_id:req.params.id})
                .then(function () {
                    res.redirect('back')
                })
                .catch(function (reason) {
                    res.json(reason)
                })

        }catch (e) {
            res.status(401).json(e)
        }
    }
}
module.exports = new CoursesController();
