const newsRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter=require('./courses')
const userRouter=require('./authentication')
function route(app) {
  app.use('/news', newsRouter)
  app.use('/courses',coursesRouter)
  app.use('/authen',userRouter)
  app.use('/', siteRouter)
}
module.exports = route;
