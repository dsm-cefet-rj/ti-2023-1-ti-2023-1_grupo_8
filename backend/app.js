/*var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var mesasRouter = require('./routes/mesas');

const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/tablemaster';
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });




var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/mesas', mesasRouter);

module.exports = app;*/

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const mesasRouter = require('./routes/mesas');

const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/tablemaster';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(url, options)
  .then(() => {
    console.log("Connected correctly to server");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/mesas', mesasRouter);

module.exports = app;

