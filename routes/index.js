var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', function(req, res, next) {
	var stringsArray = ({
		// Variables strings array to be used in this jade file
		blad: "bjarni",
		boat: "booooo"
	});

	res.render('index', stringsArray);
});

module.exports = router;