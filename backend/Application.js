const PORT = 8080;
var http = require('http');
var Repository = require('./repository/Repository');
var Router = require('./routers/Router');
 
Repository.createRepository('mongodb://localhost:27017/exampleDb').then(function() {
	var server = http.createServer(Router.getRouter()).listen(PORT); 
	console.log('[BACKEND] Listening to port ' + PORT);
}).catch(function(err) {
	console.info(err);
	process.exit();
});