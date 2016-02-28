// scripts.js
var jqueryFunction;

$( document ).ready(function() {
	// Sign in drop down. Handles menu drop down
    $('.dropdown-menu').find('form').click(function (e) {
        e.stopPropagation();
    });

    // Making the navigation bars responsive
    $(window).on('load resize', function () {
		//responsiveNavigationBars();
	});
});
