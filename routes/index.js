var express = require('express');
var router = express.Router();
var csrf = require('csurf');


var csrfProtection = csrf();
router.use(csrfProtection);

  router.get('/', function(req,res,next){
    var messages = req.flash('error');
    
      //if(req.isAuthenticated())
      //  res.redirect('/event');
      //else
      req.logout();
        res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length>0});
  })

  module.exports = router;