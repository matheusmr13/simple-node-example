var Colorize = require('./Colorize.js');
$.fn.colorizeElement = function(string) {
	$(this).each(function() {
		var color = Colorize.getColor(string);
		$(this).css('background-color','rgb('+color.r+','+color.g+','+color.b+')');
	});
};