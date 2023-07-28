const Course = require('../modle/Course');
const until = require('../../until/Mongoose');
const Cart=require('../modle/Cart')
const MeController = {
    //[GET] /me/stored/courses
    async stored(req, res) {
        await Cart.find({userId:req.cookies.userId})
            .then(function (courses) {
                res.render('me/storedCourse', {
                    course: until.multipleMongooseToObject(courses),
                });
            })
            .catch(function (e) {
                console.log(e);
            });
    },
};
module.exports = MeController;
