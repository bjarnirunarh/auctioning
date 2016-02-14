var express = require('express');
var router = express.Router();
var underscore = require('underscore');

/* GET home page */
router.get('/', function(req, res, next) {
	var layoutStringsArray = ({
		// Variables strings array to be used in all jade files that extend layout
		pageTitle: i18n.__("Uppboð"),
  		locale: i18n.getLocale(),
  		// Navbar strings
  		icelandic: i18n.__("Íslenska"),
  		english: i18n.__("Enska"),

	});
	var indexStringsArray = ({
		// Variables strings array to be used in this jade file
		
	});

	stringsArray = underscore.extend(layoutStringsArray, indexStringsArray);

	res.render('index', stringsArray);
});

module.exports = router;