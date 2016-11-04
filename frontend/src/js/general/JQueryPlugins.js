var Colorize = require('./Colorize.js');
$.fn.colorizeElement = function(string) {
	$(this).each(function() {
		string = string.toUpperCase();
		var color = Colorize.getColor(string);
		$(this).css('background-color','rgb('+color.r+','+color.g+','+color.b+')');
	});
};