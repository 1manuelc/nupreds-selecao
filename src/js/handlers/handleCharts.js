/**
 *
 * @param {String} chartLabel
 * @param {Array} yAxis
 * @param {Array} xAxis
 * @param {String} chartType
 */
export function drawBarChart(chartLabel, yAxis, xAxis, chartType = 'bar') {
	const fontSize = getFontSizeByWindow();
	const data = [
		{
			x: xAxis,
			y: yAxis,
			text: yAxis,
			type: chartType,
		},
	];

	var layout = {
		title: chartLabel,
		font: { size: fontSize },
		xaxis: {
			tickfont: {
				color: 'rgb(50,50,50)',
			},
		},
	};

	var config = { responsive: true, scrollZoom: true };

	Plotly.newPlot('chart-view', data, layout, config);
}

function getFontSizeByWindow() {
	const width = window.innerWidth;
	if (width < 672) return width / 56;
	else return 12;
}

export function drawPieChart(chartLabel, yAxis, xAxis) {
	const fontSize = getFontSizeByWindow();
	var data = [
		{
			values: yAxis,
			labels: xAxis,
			type: 'pie',
			hole: 0.4,
		},
	];

	var layout = {
		title: chartLabel,
		font: { size: fontSize },
		showlegend: false,
	};

	Plotly.newPlot('chart-view', data, layout, { responsive: true });
}
