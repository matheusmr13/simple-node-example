var router = require('node-router')();
var route = router.push;

route('GET', '/metric', getDataset); 

var Router = {};
// No need to create more files while only one routerUrl is available
// TODO extract 'metric' router to MetricRouter

function getDataset(req, res, next) {
	var MetricService = new (require.main.require('./services/MetricService'))();
	MetricService.listAll().then(function(l){
		res.send(JSON.stringify(l));
	}); 
}
Router.getRouter = function() {
	return router;
};

module.exports = Router;