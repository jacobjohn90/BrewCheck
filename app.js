const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override')

const indexRouter = require('./controllers/index');
const userController = require('./controllers/userController');
const breweriesController = require('./controllers/breweriesController');
const beersController = require('./controllers/beersController');

const app = express();

require('dotenv').config();
const mongoose = require('mongoose');

// Connect to Database
mongoose.connect(process.env.MONGODB_URI);

// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'))

app.use(methodOverride('_method'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Registering controllers
app.use('/', indexRouter);
app.use('/users', userController);
app.use('/users/:userId/breweries', breweriesController)
app.use('/users/:userId/breweries/:breweryId/beers', beersController)

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
