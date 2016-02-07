// scripts.js
var jqueryFunction;

// Language and locale handeling
//var Localize = require('localize');
//var myLocalize = new Localize('strings', '', 'is');
var lang = "is";

$( document ).ready(function() {
    $( "a" ).click(function( event ) {
 		if(lang === "is"){
 			lang = "en";
 			//myLocalize.setLocale(lang);	
 			console.log(lang);
 		}
 		else{
 			lang = "is";
 			//myLocalize.setLocale(lang);	
 			console.log(lang);
 		}	
    });
});