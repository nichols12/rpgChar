var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('cookie-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var charsRouter = require('./routes/chars');

// var chars = require('./Model/Char');
// var users = require('./Model/User');

// chars.sync();
// users.sync();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour

app.use(session({
  
  name:'session',
  keys: ['key1','key2'],
  cookie:{
    secure:true,
    httpOnly: true,
    expires: expiryDate,
  }
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chars', charsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
