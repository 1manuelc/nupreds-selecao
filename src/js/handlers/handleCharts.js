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

export function drawPieChart(chartLabel, yAxis, xAxis) {
	const fontSize = getFontSizeByWindow();
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
		font: { size: 10 },
		// showlegend: false,
	};

	Plotly.newPlot('chart-view', data, layout, { responsive: true });
}

function getFontSizeByWindow() {
	const width = window.innerWidth;
	return width < 672 ? width / 56 : 12;
}
