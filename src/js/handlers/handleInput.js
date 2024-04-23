import { drawPieChart, drawBarChart } from './handleCharts.js';
import {
	getFilteredByDateData,
	getPrimaryData,
	getSecondaryData,
} from './handleData.js';

export function handleInputs() {
	const firstValue = document.querySelector('#first-filter-select').value;
	const secondValue = document.querySelector('#second-filter-select').value;
	const dateFilterType = document.querySelector(
		'input[name="radio-time-filter"]:checked'
	).value;

	const dateInput = document.querySelector('input[name="filter-date"]').value;
	const date = convertDateInputToObject(dateInput);

	const chartType = document.querySelector('#chart-type-filter-select').value;

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

function convertDateInputToObject(input) {
	const date = new Date(input + 'T00:00:00');
	const offset = date.getTimezoneOffset(); // Obtém a diferença de fuso horário em minutos
	date.setMinutes(date.getMinutes() + offset);
	return date;
}
