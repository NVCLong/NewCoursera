const User = require('../modle/User');
const until = require('../../until/Mongoose');
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodeMailer= require('nodemailer')
const mailGen=require('mailgen')
const ls = require('local-storage');
const Mailgen = require("mailgen");

class UserController {
  loginForm(req, res) {
    res.render('authentication/login');
  }
  async login(req, res) {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        res.status(404).json('error');
      }

      // Verify password
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password,
      );
      if (!validPassword) {
        res.status(404).json('wrong password');
      }
      if (user && validPassword) {
        const accessToken = jwt.sign(
          {
            id: user.id,
            admin: user.admin,
          },
          'secret',
          { expiresIn: 60 * 60 },
        );
        const refreshToken = jwt.sign(
          {
            id: user.id,
          },
          'secret',
          { expiresIn: '30d' },
        );
        //store userid to cookie
        res.cookie('userId', user.id);
        res.cookie('admin', user.admin);
        // store refresh token into cookies
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          sameSite: 'strict',
          secure: false,
        });
        res.cookie('accessToken', accessToken, {
          httpOnly: true,
          sameSite: 'strict',
          secure: false,
        });
        // res.status(200).json(localStorage.getItem('username'))
        res.status(200).redirect('/');
      }
    } catch (e) {
      res.status(400).json(e);
    }
  }

  registerForm(req, res) {
    res.render('authentication/register');
  }

  async register(req, res) {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      // creat new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });
      // save to database
      await newUser.save();
      res.status(200).redirect('/authen');
    } catch (e) {
      res.status(400).json('error' + e);
    }
  }

  //[GET] /authen/mailForm
  async mailForm(req,res){
    try{
      res.render('authentication/mailForm')

    }catch (e) {
      console.log(e)
      res.status(401).json({msg:e})
    }
  }

  //[POST] /authen/mailSend
  async mailSend(req,res){
    try{
      const user=await User.findOne({username:req.body.username})
      const transporter = nodeMailer.createTransport({
        service:'gmail',
        auth: {
          user: "companycoursera@gmail.com",
          pass: "kcyzdemrnetwbojs"
        }
      });
      const mailGenerator= new Mailgen({
        theme:'default',
        product:{
          name: 'Coursera',
          link: 'https://mailgen.js/'
        }
      })

      let response={
        body:{
          name:"Get Coursera account's password",
          intro:"Get your Password",
          table:{
            data:[
              {
                username: user.username,
                email: user.email,
                link: `<a href="https://666a-2402-800-628f-5cda-cd-82a7-e8c6-a63c.ngrok-free.app/authen/resetpassword/${user.username}">Reset</a>`
              }
            ],
            outro:"Click on this link to reset your password"
          }
        }
      }
      let mail= mailGenerator.generate(response)
      await transporter.sendMail({
        from: "foo@example.com",
        to: user.email,
        subject: "Reset password confirmation",
        html: mail,
      })
          .then(function () {
            res.status(201).json({msg:"send email success"})
          })
          .catch(function (reason) {
            console.log(reason)
            res.json({e: reason})
          })


    }catch (e) {
      console.log(e)
      res.status(401).json({msg:e})
    }
  }

  //[GET] /authen/resetpassword/:email

   resetPass(req,res){
    User.findOne({username: req.params.username})
        .then(function (user) {
          res.render('authentication/passwordReset',{user:until.mongooseToObject(user)})
        })
  }

  //[PUT] /authen/resetpassword/:id
   async updatePassword(req,res){
     const salt = bcrypt.genSaltSync(10);
     const hash = bcrypt.hashSync(req.body.newPassword, salt);
     console.log(req.params.id)
    await User.updateOne({_id:req.params.id},{
      password: hash
    })
        .then(function () {
          res.redirect('/authen/')
        })
        .catch(function (reason) {
          console.log(reason)
          res.status(401).json({e:reason})
        })
   }

  async userLogout(req, res) {
    try {
      res.clearCookie('accessToken');
      res.clearCookie('admin')
      res.clearCookie('refreshToken')
      res.clearCookie('userId')
      res.redirect('/');
    } catch (e) {
      res.json(e);
    }
  }
}
module.exports = new UserController();
