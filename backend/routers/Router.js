var router = require('node-router')();
var route = router.push;

route('GET', '/metric', getDataset); 

// No need to create more files while only one routerUrl is available
// TODO extract 'metric' router to MetricRouter

function getDataset(req, res, next) {
	var MetricService = new (require('./services/MetricService'))();
	MetricService.listAll().then(function(l){
		res.send(JSON.stringify(l));
	}); 
}
