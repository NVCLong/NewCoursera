const { multipleMongooseToObject } = require('../../until/Mongoose');


class MessageController{
    //[GET] /message
    messagePage(req,res){
        res.render('message/messagePage')
    }
}


module.exports=new MessageController()