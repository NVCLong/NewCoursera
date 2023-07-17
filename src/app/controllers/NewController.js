class NewController {
  // [GET]  /news
  index(req, res) {
    res.render('news');
  }
  // [GET} /news/:slug

  show(req, res) {
    res.send('Welcome to news detail');
  }
}
module.exports = new NewController();
