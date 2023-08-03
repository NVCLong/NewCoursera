const User = require('../modle/User');
const until = require('../../until/Mongoose');
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');
const jwt = require('jsonwebtoken');
const ls = require('local-storage');

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
        res.cookie('admin',user.admin)
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

  async userLogout(req, res) {
    try {
      res.clearCookie('accessToken');
      res.redirect('/');
    } catch (e) {
      res.json(e);
    }
  }
}
module.exports = new UserController();
