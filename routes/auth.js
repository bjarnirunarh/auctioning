/* jshint node: true */
'use strict';

var express = require('express');
var router = express.Router();

var users = require('../lib/users');
var validation = require('../lib/validate');
var formValidator = require('../lib/formValidator');

router.get('/login', redirectIfLoggedIn, login);
router.post('/login', loginHandler);
router.get('/logout', logout);
router.get('/create', createForm);
router.post('/create', createHandler);

module.exports = router;

/** route middlewares **/

function createForm(req, res) {
  var data = { title: 'Búa til notanda', form: form, submitted: false };
  res.render('create', data);
}

function createHandler(req, res) {
  var result = formValidator(form, req.body);

  var hasErrors = result.hasErrors;
  var processedForm = result.processedForm;
  
  var data = { title: 'Búa til notanda',
               form: processedForm,
               submitted: true,
               errors: hasErrors
             };

  if (!hasErrors) {
    var username = processedForm[0].value;
    var password = processedForm[1].value;
    users.createUser(username, password, function (err, result) {
      if (result) {
        res.redirect('/login');
      } else {
        data.hasErrors = true;
        res.render('create', data);
      }
    });
  } else {
    res.render('create', data);
  }
}

function redirectIfLoggedIn(req, res, next) {
  if (req.session.user) {
    res.redirect('/');
  } else {
    next();
  }
}

function login(req, res) {
  var data = { title: 'Búa til notanda', form: form, submitted: false };
  res.render('login', data);
}

function loginHandler(req, res) {
  var result = formValidator(form, req.body);

  var hasErrors = result.hasErrors;
  var processedForm = result.processedForm;
  
  var data = { title: 'Innskrá',
               form: processedForm,
               submitted: true,
               errors: hasErrors
             };

  if (!hasErrors) {
    var username = processedForm[0].value;
    var password = processedForm[1].value;
    users.auth(username, password, function (err, user) {
      if (user) {
        req.session.regenerate(function (){
          req.session.user = user;
          res.redirect('/');
        });
      } else {
        data.errors = true;
        data.loginError = true;
        res.render('login', data);
      }
    });
  } else {
    res.render('login', data);
  }
}

function logout(req, res) {
  req.session.destroy(function(){
    res.redirect('/');
  });
}

/** data **/

var form = [
  {
    name: 'longname',
    label: 'Nafn fyrirtækis',
    type: 'text',
    value: '',
    required: true,
    validation: [boundLengthValidation(5)],
    valid: false,
    validationString: 'Nafn fyrirtækis þarf að vera a.m.k. fimm stafir'
  },
  {
    name: 'username',
    label: 'Notendanafn',
    type: 'text',
    value: '',
    required: true,
    validation: [boundLengthValidation(3)],
    valid: false,
    validationString: 'Notendanafn þarf að vera a.m.k. þrír stafir'
  },
  {
    name: 'password',
    label: 'Lykilorð',
    type: 'password',
    required: true,
    validation: [boundLengthValidation(5)],
    valid: false,
    validationString: 'Lykilorð verður að vera a.m.k. fimm stafir'
  },
  {
    name: 'passwordAgain',
    label: 'Endurtaka Lykilorð',
    type: 'password',
    required: true,
    validation: [boundLengthValidation(5)],
    valid: false,
    validationString: 'Endurtekið lykilorð verður að vera það sama og lykilorð'
  }
];

/*form(method="post" class="col-md-6 col-xs-10")
    fieldset.form-group
      label(for="username") Nafn fyrirtækis:
      input(id="username" type="text" placeholder="Nafn" name="longname").form-control
    fieldset.form-group
      label(for="username") Notendanafn:
      input(id="username" type="text" placeholder="Notendanafn" name="username").form-control
    fieldset.form-group
      label(for="password") Lykilorð:
      input(id="password" name="password" input type="password" placeholder="Lykilorð").form-control
    fieldset.form-group
      label(for="password") Endurtaka Lykilorð:
      input(id="password" name="password" input type="password" placeholder="Lykilorð").form-control
    button(type="submit" class="btn btn-primary") Skrá mig
*/
/** helpers **/

function boundLengthValidation(n) {
  return function (s) {
    return validation.length(s, n);
  };
}