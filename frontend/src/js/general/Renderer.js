var Request = require('./Request.js');
var doT = require('dot');
var Renderer = {};

var ObjectTypes = {
	OBJECT: 'OBJECT',
	PAGE: 'PAGE'
};

Renderer.requestObj = function (url, objectName, settings) {
	return {
		url: url,
		pageObject: objectName,
		type: ObjectTypes.OBJECT
	};
};

Renderer.requestPage = function (url, pageName) {
	return {
		url: url,
		pageObject: pageName,
		type: ObjectTypes.PAGE
	};
};

Renderer.showPage = function (pageUrl, settings) {
	return Renderer.openNewPage(pageUrl, null, settings);
};

Renderer.populatePage = function (pageUrl, data, settings) {
	settings.injectElements = settings.injectElements || {};
	for (var propertie in data) {
		settings.injectElements[propertie] = data[propertie];
	}
	return Renderer.openNewPage(pageUrl, null, settings);
};

Renderer.openNewPage = function (pageUrl, dataRequests, settings) {
	settings = settings || {};
	return new Promise(function(resolve, reject){
		var container = getMainContainer(settings),
			mainObject = settings.mainObject;

		var requests = [Request.GET_HTML(pageUrl)];
		if (dataRequests) {
			requests = requests.concat(getRequestPromises(dataRequests));
		}

		Promise.all(requests).then(function () {
			var returnObj = arguments[0],
				page = returnObj[0],
				objectToDot = createItObject(returnObj, dataRequests, settings);
			
			container.html(doT.template(page)(objectToDot));

			resolve({
				container: container,
				it: objectToDot
			});
		}).catch(function (e) {
			reject();
		});
	});
};

var getRequestPromises = function(dataRequests) {
	var requests = [];
	for (var i = 0; i < dataRequests.length; i++) {
		if (dataRequests[i].type == ObjectTypes.PAGE) {
			requests.push(Request.GET_HTML(dataRequests[i].url));
		} else if (dataRequests[i].type == ObjectTypes.OBJECT) {
			requests.push(Request.GET(dataRequests[i].url, dataRequests[i].settings ));
		}
	}
	return requests;
};

var createItObject = function (requestReturns, dataRequests, settings) {
	var objectToDot = {};
	if (dataRequests && dataRequests.length) {
		for (var i = 1; i < requestReturns.length; i++) {
			if (dataRequests[i - 1].type == ObjectTypes.PAGE) {
				objectToDot[dataRequests[i - 1].pageObject + 'Template'] = doT.template(requestReturns[i]);
			} else {
				objectToDot[dataRequests[i - 1].pageObject] = requestReturns[i];
			}
		}
	}

	if (settings.injectObjects) {
		for (var propertie in settings.injectObjects) {
			objectToDot[propertie] = settings.injectObjects[propertie];
		}
	}

	return objectToDot;
};

var getMainContainer = function (settings) {
	if (settings) {
		return settings.containerJquery || $(settings.container || '#content');
	}
	return $('#content');
};

module.exports = Renderer;
