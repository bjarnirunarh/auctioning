// scripts.js
var jqueryFunction;

$( document ).ready(function() {
	// Sign in drop down. Handles menu drop down
    $('.dropdown-menu').find('form').click(function (e) {
        e.stopPropagation();
    });
    /*$( "a" ).click(function( event ) {
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
    });*/
});