import { drawPieChart, drawBarChart } from './handleCharts.js';
import {
	getFilteredByDateData,
	getPrimaryData,
	getSecondaryData,
} from './handleData.js';

export function handleInputs() {
	let firstValue, secondValue, dateFilterType, date, chartType;

	const firstSelect = document.querySelector('#first-filter-select');
	firstValue = firstSelect.value;

	const secondSelect = document.querySelector('#second-filter-select');
	secondValue = secondSelect.value;

	const dateRadioValue = document.querySelector(
		'input[name="radio-time-filter"]:checked'
	).value;
	dateFilterType = dateRadioValue;

	const dateValue = document.querySelector('input[name="filter-date"]').value;

	(function parseDate() {
		const splittedDate = dateValue.split('-');
		if (splittedDate[0] !== '') {
			splittedDate[1] = (parseInt(splittedDate[1]) - 1)
				.toString()
				.padStart(2, '0');
			date = new Date(splittedDate[0], splittedDate[1], splittedDate[2]);
		} else date = null;
	})();

	const chartSelect = document.querySelector('#chart-type-filter-select');
	chartType = chartSelect.value;

	const mainData = getPrimaryData(firstValue);
	const secondaryData = getSecondaryData(secondValue, mainData);
	const resultArray = getFilteredByDateData(
		dateFilterType,
		secondaryData[0],
		date
	);
	const xAxis = resultArray[0];
	const yAxis = secondaryData[1];

	if (chartType === 'bar') {
		drawBarChart(
			`${firstValue} por ${secondValue} (totalizando ${xAxis.reduce(
				(ac, i) => ac + i
			)} em ${resultArray[1]})`,
			xAxis,
			yAxis
		);
	} else if (chartType === 'pie') {
		drawPieChart(
			`${firstValue} por ${secondValue} (totalizando ${xAxis.reduce(
				(ac, i) => ac + i
			)} em ${resultArray[1]})`,
			xAxis,
			yAxis
		);
	}
}
