var BaseService = require('./BaseService');
var util = require('util');

function MetricService() {
	BaseService.apply(this, ['metric']);
}

util.inherits(MetricService, BaseService);

module.exports = MetricService;