var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();
var session = require('express-session');
var passport = require('passport');
var methodOverride = require('method-override');
const MongoStore = require('connect-mongo')

require('dotenv').config();
require('./config/database');
require('./config/passport');

var indexRouter = require('./routes/index');
var tweetsRouter = require('./routes/tweets');
const profilesRouter = require('./routes/profiles');
const replyRouter = require('./routes/reply');
const exploreRouter = require('./routes/explore');
const messagesRouter = require('./routes/messages')
const newsRouter = require('./routes/news')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.DATABASE_URL
  })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});


app.use('/', indexRouter);
app.use('/tweets', tweetsRouter);
app.use('/profiles', profilesRouter);
app.use('/explore', exploreRouter);
app.use('/', replyRouter);
app.use('/messages', messagesRouter);
app.use('/news', newsRouter);

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
