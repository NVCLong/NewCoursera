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
}


module.exports=new MessageController()