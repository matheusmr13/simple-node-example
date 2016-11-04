var Renderer = require('./../general/Renderer.js');
var Formatter = require('./../general/Formatter.js');
var Colorize = require('./../general/Colorize.js');

var Metrics = {};
var filter = {};
var states = {};
var dates;
Metrics.initialize = function() {
	var requests = [Renderer.requestObj('/metric', 'metrics')];
	Renderer.openNewPage('/metrics/list', requests, {
		injectObjects: {
			Formatter: Formatter
		}
	}).then(function(result) {

		var metrics = result.it.metrics;
		
		createChart(result.container, metrics);
		loadOptions($('.date-filter select'), dates.map(function(date) {
			var formattedDate = Formatter.formatDate(date); 
			return {
				value: formattedDate,
				text: formattedDate
			}
		}));
		loadOptions($('.state-filter select'), Object.keys(states).map(function(state) { 
			return {
				value: state,
				text: state
			}
		}));
		bindButtons(result.container);
		$('#table-view').click();
	});
};

Metrics._orderDates = function(perDate) {
	var dates = Object.keys(perDate);
	dates.sort(function(a, b) {
		a = new Date(a);
		b = new Date(b);
		return a > b ? 1 : a < b ? -1 : 0;
	});
	return dates;
};

var createChart = function(container, metrics) {
	var perDate = {};
	for (var i = 0; i < metrics.length; i++){ 
		var metric = metrics[i];
		var state = metric.state;
		states[state] = true;
		perDate[metric.date] = perDate[metric.date] || {};
		perDate[metric.date][state] = perDate[metric.date][state] || 0;
		perDate[metric.date][state] += (metric.metric == 'Revenue' ? 1 : -1) * metric.value; 
	}
	dates = Metrics._orderDates(perDate);
	var lineChartData = getDataToChart(perDate, states);
	var ctx = document.getElementById("metrics-chart").getContext("2d");
	new Chart(ctx).Line(lineChartData);

	populateLabels(container, states);
};

var getDataToChart = function(perDate, states) {
	var lineChartData = {};
	lineChartData.labels = [];
	lineChartData.datasets = [];
	var line = 0;
	for (var state in states) {
		var y = [];
		lineChartData.datasets.push({});
		var dataset = lineChartData.datasets[line];
		var color = Colorize.getColor(state);
		dataset.fillColor = 'rgba(0,0,0,0)';
		var colorRgb = 'rgba('+color.r+','+color.g+','+color.b+',1)'
		dataset.strokeColor = colorRgb;
		dataset.pointColor = colorRgb;
		dataset.data = [];

		for (var x = 0; x < dates.length; x++) {
			y.push(perDate[dates[x]][state]);
			if (line === 0)
				lineChartData.labels.push(Formatter.formatDate(dates[x]));
		}

		lineChartData.datasets[line].data = y;
		line++;
	}
	return lineChartData;
};

var populateLabels = function(container, states) {
	for (var state in states) {
		var stateLabel = $('<div class="metrics-label">' + state.toUpperCase() + '</div>');
		container.find('.metrics-labels').append(stateLabel);
		stateLabel.colorizeElement(state);
	}
};

var loadOptions = function(container, array) {
	Renderer.showPage('/metrics/periferics/select-options', {
		injectObjects: {
			options: array
		},
		containerJquery: container
	}).then(function() {
		container.material_select();
	});
}

var bindButtons = function(container) {
	container.find('[name="view"]').click(function() {
		var toShow = $(this).prop('id');
		container.find('.view-type').hide().filter(function(){return $(this).hasClass(toShow);}).show();
	}).end().find('.date-filter select').change(function() {
		filter.date = $(this).val();
		applyFilter(container);
	}).end().find('.state-filter select').change(function() {
		filter.state = $(this).val();
		applyFilter(container);
	});
};

var applyFilter = function(container) {
	container.find('.table-view.view-type table tbody tr').show().each(function() {
		if (filter.state && filter.state.length && filter.state.indexOf($(this).find('td:eq(1)').text()) == -1) {
			$(this).hide();
			return;
		}

		if (filter.date && filter.date.length && filter.date.indexOf($(this).find('td:eq(0)').text()) == -1) {
			$(this).hide();
			return;
		}
	});
};

module.exports = Metrics;