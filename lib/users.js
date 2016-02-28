/* jshint node: true */
'use strict';

var hash = require('./pass').hash;
var query = require('./query');

function createUserWithHashAndSalt (username, userlongname, salt, hash, isbuyer, isseller, isfishmarket, isadmin, cb) {
  var values = [username, salt, hash, new Date(), isbuyer, isseller, isfishmarket, isadmin],
  q = 'INSERT INTO users (username, userlongname, salt, hash, datelogin, isbuyer, isseller, isfishmarket, isadmin) VALUES($1, $2, $3, $4)';

  query(q, values, function (err) {
    if (err) {
      return cb(err);
    } else {
      return cb(null, true);
    }
  });
}

function findUser (username, cb) {
  var values = [username];
  var q = 'SELECT userid, username, userlongname, salt, hash, datelogin, isbuyer, isseller, isfishmarket, isadmin FROM users WHERE username = $1';
  
  query(q, values, function (err, result) {
    if (err) {
      return cb(err);
    } else {
      return cb(null, result.rows);
    }
  });
}

module.exports.createUser = function createUser (username, password, userlongname, cb) {
  hash(password, function (err, salt, hash) {
    if (err) {
      return cb(err);
    }
    var isbuyer, isseller, isfishmarket, isadmin = false;
    createUserWithHashAndSalt(username, userlongname, salt, hash, isbuyer, isseller, isfishmarket, isadmin, cb);
  });
};

module.exports.auth = function auth (name, pass, fn) {
  findUser(name, function (err, result) {
    var user = null;

    if (result.length === 1) {
      user = result[0];
    }

    if (!user) {
      return fn(new Error('cannot find user'));
    }

    hash(pass, user.salt, function(err, hash){
      if (err) {
        return fn(err);
      }
      
      if (hash === user.hash) {
        return fn(null, user);
      }

      fn(new Error('invalid password'));
    });
  });
};