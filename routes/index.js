var express = require('express');
var router = express.Router();

// Language and locale handeling
var Localize = require('localize');
var myLocalize = new Localize('strings', '', 'is');

// Variables strings array to be used in the jade file
var stringsArray = { 
	pageTitle: 'Auctioning',
  	lang: myLocalize.translate("Tungumál") 
};

/* GET home page */
router.get('/', function(req, res, next) {
	res.render('index', stringsArray);
});

module.exports = router;