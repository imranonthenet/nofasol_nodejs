var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var Handlebars = require('handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var MongoStore = require('connect-mongo')(session);
var cache = require('memory-cache');
var moment = require('moment');


var Country = require('./models/country');
var BadgeCategory = require('./models/badge-category');


mongoose.connect('localhost:27017/events');
require('./config/passport');



var index = require('./routes/index');
var userRoutes = require('./routes/user');
var eventRoutes = require('./routes/event');

var app = express();

// view engine setup
var hbs = exphbs.create({
  handlebars: Handlebars,
  helpers: {
    option: function (codes, selectedValue) {
      var results ="";
      for(var i=0; i<codes.length; i++){
        results += '<option value="' + codes[i]._id + '" ' + (selectedValue == codes[i]._id ? 'selected' : '') + '>' + codes[i].desc + '</option>\n';
  
      }
      return new Handlebars.SafeString(results);
    },

    formatDate: function(datetime, format){
      var DateFormats = {
        short: "DD MMMM - YYYY",
        long: "dddd DD.MM.YYYY HH:mm"
      };

      format = DateFormats[format] || format;
      return moment(datetime).format(format);
    }

  },
  defaultLayout:'layout',
  extname:'.hbs'
});


app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret:'mysupersecret', 
  resave:false, 
  saveUninitialized:false ,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: {maxAge: 180 * 60 * 1000}
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  res.locals.user = req.user;

  if(cache.get('countries') && cache.get('badgeCategories')){
    res.locals.countries = cache.get('countries');
    res.locals.badgeCategories = cache.get('badgeCategories');
    console.log('finished loading cache');
    next();
  }
  else {
    Country.find(function(err,countries){
      BadgeCategory.find(function(err,badgeCategories){
          cache.put('countries',countries);
          cache.put('badgeCategories', badgeCategories);

          res.locals.countries = cache.get('countries');
          res.locals.badgeCategories = cache.get('badgeCategories');
          
          console.log('finished loading lookup tables');

          next();
      });//badge categories
    });//countries
  }



  
});

app.use('/user', userRoutes);
app.use('/event', eventRoutes);
app.use('/', index);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
