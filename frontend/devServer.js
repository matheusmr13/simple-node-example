const PORT = 3000;
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var proxy = require('proxy-middleware');
var url = require('url');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/api', proxy(url.parse('http://localhost:8080/')));
app.use(express.static('assets'));

app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', function (err) {
	if (err) {
		console.log(err);
		return;
	}

	console.log('[FRONTEND] Listening to port ' + PORT);
});
