var Colorize = {};

Colorize.getColor = function(string) {
	var r = 1,
		g = 1,
		b = 1;
	for (var i = 0; i < string.length; i++) {
		r += string.charCodeAt(i);
		g += Math.pow(string.charCodeAt(i), 3);
		b *= string.charCodeAt(i);

	}
	r = r % 255;
	g = g % 255;
	b = b % 255;
	if ((r + g + b) / 3 > 200) {
		r = 200;
		g = 200;
		b = 200;
	}
	return {
		r: r,
		g: g,
		b: b
	};
};

module.exports = Colorize;