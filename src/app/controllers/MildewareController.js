const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');

const middlewareController = {
  // verify
  verifyToken(req, res, next) {
    const token = req.cookies.accessToken;
    console.log(token);
    if (token) {
      jwt.verify(token, 'secret', (e, user) => {
        if (e) {
          res.redirect('/authen');
        }
        req.user = user;
        next();
      });
    } else {
      res.redirect('/authen');
    }
  },

  adminVerify(req, res, next) {
    const adminData = req.cookies.accessToken;
    if (adminData) {
      const decoded = jwt_decode(adminData);
      if (decoded.admin === true) {
        next();
      } else {
        res.redirect('/');
      }
    } else {
      res.redirect('/authen');
    }
  },
};

// store token
//1. Local storage
// => easy to attack by XSS
// 2. cookies ( HTTP cookies)
// => hard top attack by XSS
// but can easy to attack by CSRF but can enhance by using SAME STATE
// 3. Redux store to store access token
//    http cookies to store refresh token

module.exports = middlewareController;
