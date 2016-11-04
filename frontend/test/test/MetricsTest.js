var assert = require('chai').assert;
var Metrics = require('./../../src/js/pages/metrics.js');

describe('Metrics test', function() {
	describe('orderDates', function() {
		var perDate = {
			'2016-10-18T00:00:00.000Z': true,
			'2016-10-20T00:00:00.000Z': true,
			'2016-10-10T00:00:00.000Z': true
		};
		it('should order dates', function() {
			var dates = Metrics._orderDates(perDate);
			assert.equal('2016-10-10T00:00:00.000Z', dates[0]);
			assert.equal('2016-10-18T00:00:00.000Z', dates[1]);
			assert.equal('2016-10-20T00:00:00.000Z', dates[2]);
		});
	});
});