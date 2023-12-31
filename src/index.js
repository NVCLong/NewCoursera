const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const route = require('./routes/index');
const cookieParser = require('cookie-parser');
const db = require('./config/db');
var methodOverride = require('method-override');
const app = express();
const port = 3000;
const server = require('http').createServer(app);
const io = require('socket.io')(server);

db.connect().then(function () {
  console.log('Success');
});
db.handleConnect().then(function () {
  console.log('Success connect to news');
});

app.use(morgan('combined'));

//cookies set/get value
app.use(cookieParser());

// use Static file like css, or image
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());
app.use(express.json());

// Template engine
app.engine(
  'hbs',
  handlebars.engine({
    extname: 'hbs',
    helpers: {
      sum: (a, b) => a + b,
    },
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource', 'views'));

console.log('Path: ' + path.join(__dirname, 'resource', 'views'));

//method overide
app.use(methodOverride('_method'));

route(app);

// socket connection
io.on('connection', (server) => {
  console.log('Socket connection');
  //join room for server
  server.on('join_room', (room) => {
    server.join(room);
  });

  server.on('on-chat', (data) => {
    server.broadcast.to(data.room).emit('user-chat', data.message);
  });

  server.on('disconnect', () => {
    /* … */
  });
});
server.listen(port, () => {
  console.log(` http://localhost:${port}/`);
});
