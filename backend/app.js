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









var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');

var mesasRouter = require('./routes/mesas');
var cardapioRouter = require('./routes/cardapio');
var pedidosRouter = require('./routes/pedidos');


const mongoose = require('mongoose');


const url = 'mongodb://127.0.0.1:27017/tablemaster';
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/mesas', mesasRouter);
app.use('/cardapio', cardapioRouter);
app.use('/pedidos', pedidosRouter);
module.exports = app;
