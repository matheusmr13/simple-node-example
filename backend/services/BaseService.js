var Repository = require.main.require('./repository/Repository');
function BaseService(collectionName) {

	var BaseService = this;
	this._collectionName = collectionName;
	this._collection = Repository.getCollection(this._collectionName);
	this.listAll = function() {
		return  new Promise((resolve, reject) => {
			this._collection.find().toArray(function(err, items) {
				if (err) {
					reject(err);
				}
				resolve(items);
			});
		});
	};

	this.insert = function(entity) {
		if (typeof entity == 'object') {
			return this._collection.insert(entity);
		}
		if (typeof entity == 'array') {
			return this._collection.insertMany(entity);
		}
	};

	this.removeAll = function() {
		return this._collection.remove();
	};
}

module.exports = BaseService;
