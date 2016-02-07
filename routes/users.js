var express = require('express');
var router = express.Router();

// Language and locale handeling
var Localize = require('localize');
var myLocalize = new Localize('strings', '', 'is');

/* GET users listing */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

module.exports = router;
