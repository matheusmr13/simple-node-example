var Repository = require('./repository/Repository');

var parse = require('csv-parse');
var fs = require('fs');

Repository.createRepository('mongodb://localhost:27017/exampleDb').then(function() {
	var csvData = [];
	var parseDate = function(str) {
		var split = str.split('/');
		return new Date(split[2] + '-' + split[1] + '-' + split[0]);
	};
	fs.createReadStream('../assets/dataset.csv')
		.pipe(parse({
			delimiter: ','
		}))
		.on('data', function(csvrow, i) {
			csvData.push({
				date: parseDate(csvrow[0]),
				state: csvrow[1],
				metric: csvrow[2],
				value: parseInt(csvrow[3]),
			});
		})
		.on('end', function() {
			var metricService = new (require('./services/MetricService'))();
			metricService.removeAll();
			metricService.insert(csvData).then(function(result) {
				console.info(JSON.stringify(result.ops, null, 2));
				console.info('Inserted values: ' + result.ops.length);
				db.close();
			});
		});
}).catch(function(err) {
	console.info(err);
	process.exit();
});