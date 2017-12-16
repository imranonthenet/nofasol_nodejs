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
var json2xls = require('json2xls');


var Country = require('./models/country');
var BadgeCategory = require('./models/badge-category');
var Lookups = require('./models/lookups');

var connString = process.env.MONGODB_URI || 'localhost:27017/events';
mongoose.connect(connString);
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
      var results ='';
      for(var i=0; i<codes.length; i++){
        results += '<option value="' + codes[i]._id + '" ' + (selectedValue == codes[i]._id ? 'selected' : '') + '>' + codes[i].desc + '</option>\n';
  
      }
      return new Handlebars.SafeString(results);
    },

    formField: function(fieldName, fieldLabel, fieldType, fieldValue, fieldMandatory, badgeCategories){
      var results='';

      results+='<div class="form-group">';
      results+='<label for="' + fieldName + '">' + fieldLabel + '</label>';


      if(fieldType=='countries'){
        results+='<select class="form-control" id="country" name="country">';
      
        var lookups = new Lookups();
        
        for(var i=0; i<lookups.countries.length; i++){
          results += '<option value="' + lookups.countries[i].desc + '" ' + (fieldValue == lookups.countries[i].desc ? 'selected' : '') + '>' + lookups.countries[i].desc + '</option>\n';
    
        }
        
        results+='</select>';
      }

      
      else if(fieldType=='badgeCategories'){
        results+='<select class="form-control" id="badgeCategory" name="badgeCategory">';
        
        for(var i=0; i<badgeCategories.length; i++){
          results += '<option value="' + badgeCategories[i].desc + '" ' + (fieldValue == badgeCategories[i].desc ? 'selected' : '') + '>' + badgeCategories[i].desc + '</option>\n';
    
        }
        results+='</select>';
      }

      else if(fieldType=='titles'){
        results+='<select class="form-control" id="title" name="title">';
        var lookups = new Lookups();

        for(var i=0; i<lookups.titles.length; i++){
          results += '<option value="' + lookups.titles[i] + '" ' + (fieldValue == lookups.titles[i] ? 'selected' : '') + '>' + lookups.titles[i] + '</option>\n';
    
        }
        results+='</select>';
      }

      else {
        results+='<input type="text" id="' + fieldName + '" name="' + fieldName + '" value="' + fieldValue + '" ' + (fieldMandatory ? 'required':'') +  '  class="form-control">';
      }
      

      results+='</div>';

      return new Handlebars.SafeString(results);
    },

    formatDate: function(datetime, format){
      var DateFormats = {
        short: "DD MMMM - YYYY",
        long: "dddd DD.MM.YYYY HH:mm",
        custom: "DD/MM/YYYY"
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
app.use(json2xls.middleware);


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
