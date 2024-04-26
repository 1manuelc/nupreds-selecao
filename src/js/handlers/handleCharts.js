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

	const layout = {
		title: chartLabel,
		font: { size: fontSize },
		xaxis: {
			tickfont: {
				color: 'rgb(50,50,50)',
			},
		},
	};

	const config = { responsive: true, scrollZoom: true };

	Plotly.newPlot('chart-view', data, layout, config);
}

export function drawPieChart(chartLabel, yAxis, xAxis, plotItemsLimit = null) {
	if (plotItemsLimit) xAxis = xAxis.slice(0, plotItemsLimit);
	const fontSize = getFontSizeByWindow();
	const willShowLegend = willShowLegendByWidth();

	const data = [
		{
			values: yAxis,
			labels: xAxis,
			type: 'pie',
			hole: 0.4,
		},
	];

	const layout = {
		title: chartLabel,
		font: { size: fontSize },
		legend: {
			font: { size: 10 },
			itemsizing: 'fraction',
		},
		showlegend: willShowLegend,
	};

	Plotly.newPlot('chart-view', data, layout, { responsive: true });
}

function getFontSizeByWindow() {
	const width = window.innerWidth;
	return width < 672 ? width / 56 : 12;
}

function willShowLegendByWidth() {
	return window.innerWidth > 672 ? true : false;
}
