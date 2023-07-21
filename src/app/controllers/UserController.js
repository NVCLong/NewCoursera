const User= require('../modle/User')
const until=require('../../until/Mongoose')
const bcrypt=require('bcrypt')
const {hash} = require("bcrypt");

class UserController{

    loginForm(req,res){
        res.render('authentication/login')
    }
    async login(req,res){
        try{
            const user= await User.findOne({username:req.body.username})
            if(!user){
                res.status(404).json("error")
            }

            // Verify password
            const validPassword= await bcrypt.compare(
                req.body.password,
                user.password
            )
            if(!validPassword){
                res.status(404).json("wrong password")
            }
            if(user && validPassword){
                res.status(200).render('home')
            }

        }catch (e){
            res.status(400).json(e)
        }
    }

    registerForm(req, res){
        res.render('authentication/register')

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