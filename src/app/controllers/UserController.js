const User= require('../modle/User')
const until=require('../../until/Mongoose')
const bcrypt=require('bcrypt')
const {hash} = require("bcrypt");

class UserController{
    async login(req,res){

    }

    async register(req,res){
        try{

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);

            // creat new user
            const newUser=  new  User({
                username: req.body.username,
                email:req.body.email,
                password:hash
            })
            // save to database
            await newUser.save()
            res.status(200).json(newUser)

        }catch (e){
            res.status(400).json("error"+ e)
        }
    }
}
module.exports= new UserController()