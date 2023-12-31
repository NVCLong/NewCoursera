const newsRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const userRouter = require('./authentication');
const meRouter = require('./me');
const adminRouter = require('./admin');
const messageRouter = require('./message');
function route(app) {
  app.use('/news', newsRouter);
  app.use('/courses', coursesRouter);
  app.use('/authen', userRouter);
  app.use('/me', meRouter);
  app.use('/message', messageRouter);
  app.use('/admin', adminRouter);
  app.use('/', siteRouter);
}
module.exports = route;
