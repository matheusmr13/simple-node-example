var assert = require('chai').assert;
var Colorize = require('./../../src/js/general/Colorize.js');

describe('Colorize test', function () {
	describe('getColor', function () {
		it('should always repeat color independant of upper/lower case (case insensitive)', function () {
			assert.equal(JSON.stringify(Colorize.getColor('matheus')), JSON.stringify(Colorize.getColor('MATHEUS')));
			assert.equal(JSON.stringify(Colorize.getColor('mAtHeUs')), JSON.stringify(Colorize.getColor('MaThEuS')));
		});
	});
});
