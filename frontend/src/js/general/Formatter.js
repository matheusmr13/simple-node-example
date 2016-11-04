var Formatter = {};

Formatter.formatDate = function (date, withTime) {
	if (typeof date == 'string') {
		date = newDateTimezone(date);
	}

	if (!date || date == 'Invalid Date' || typeof date == 'number') {
		return '';
	}

	return Formatter.completeWithZeros(date.getDate()) + '/' + Formatter.completeWithZeros(date.getMonth() + 1) + '/' + Formatter.completeWithZeros(date.getFullYear())
		+ (withTime ? (' ' + Formatter.formatHour(date)) : '');
};

var newDateTimezone = function(date) {
	date = date.substring(0,10).split('-');
	date = date[1] + '-' + date[2] + '-' + date[0];

	return new Date(date);
};

Formatter.formatHour = function (date) {
	if (typeof date == 'string') {
		date = newDateTimezone(date);
	}

	if (!date || date == 'Invalid Date' || typeof date == 'number') {
		return '';
	}

	return Formatter.completeWithZeros(date.getHours()) + ':' + Formatter.completeWithZeros(date.getMinutes());
};

Formatter.completeWithZeros = function (stringToComplete, length) {
	length = length || 2;
	var result = stringToComplete + '';
	while (result.length < length) {
		result = '0' + result;
	}

	return result;
};

module.exports = Formatter;