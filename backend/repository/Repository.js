var Promise = require('promise');
var MongoClient = require('mongodb').MongoClient;
function Repository(connectionUrl) {

	var Repository = this;
	this.db;
	this.connect = function() {
		return new Promise((resolve, reject) => {
			MongoClient.connect(connectionUrl, function(err, db) {
				if (err) {
					console.log('Problems connecting to database: ' + err);
					reject(err);
				}
				Repository.db = db;
				resolve();
			});
		});
	};

	this.getCollection = function(collection) {
		return this.db.collection(collection);
	}
}

var actualRepository;
Repository.createRepository = function(connectionUrl) {
	actualRepository = new Repository(connectionUrl);
	return actualRepository.connect();
}
Repository.getCollection = function(collection) {
	return actualRepository.getCollection(collection);
}

module.exports = Repository;
