var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var moment = require('moment');
global.jQuery = require('jquery');

var notFoundHandler = require('./middleware/notFoundHandler');
var errorHandler = require('./middleware/errorHandler');

var SESSION_NAME = process.env.SESSION_NAME;
var SESSION_SECRET = process.env.SESSION_SECRET;

var isDev = process.env.NODE_ENV === 'development';

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Language and locale handeling
var Localize = require('localize');
var myLocalize = new Localize('strings', '', 'is');

/*app.use(function(request, response, next) {
    var lang = request.session.lang || "is";
    myLocalize.setLocale(lang);
    next();
});*/

// Multiply used varaibles for the app
title = myLocalize.translate("Uppboð");
siteLocale = myLocalize.translate("is");

app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// node modules path
app.use('/node_modules', express.static(__dirname + '/node_modules/'));


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

// Gefum viewum aðgang að moment library
app.locals.moment = moment;

// HTML verður ekki minnkað í eina línu
app.locals.pretty = isDev;

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
