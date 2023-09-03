const { multipleMongooseToObject } = require('../../until/Mongoose');




class MessageController{
    //[GET] /message
    messagePage(req,res){
        res.render('message/messagePage')
    }

    //[GET] /message/operation
    opeChat(req,res){
        res.render('message/opeChat')
    }
    //[GET] /message/academic

    acaChat(req,res){
        res.render('message/academicChat')
    }
}


module.exports=new MessageController()