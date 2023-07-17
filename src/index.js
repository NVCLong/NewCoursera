const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const db= require('./config/db')
const app = express();
const port = 3000;

db.connect().then(function (){
  console.log("Success")
})

const route = require('./routes/index');
app.use(morgan('combined'));

// use Static file like css, or image
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());
app.use(express.json());

// Template engine
app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource','views'));

console.log('Path: ' + path.join(__dirname, 'resource','views'));

route(app);

app.listen(port, () => {
  console.log(` http://localhost:${port}/`);
});
