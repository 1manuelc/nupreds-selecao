import { drawPieChart, drawBarChart } from './handleCharts.js';
import {
	getFilteredByDateData,
	getPrimaryData,
	getSecondaryData,
} from './handleData.js';

class UserInputs {
	firstFilterOption;
	secondFilterOption;
	dataFilterOption;
	date;
	chartType;

	constructor() {
		this.firstFilterOption = document.querySelector(
			'#first-filter-select'
		).value;
		this.secondFilterOption = document.querySelector(
			'#second-filter-select'
		).value;
		this.dataFilterOption = document.querySelector(
			'input[name="radio-time-filter"]:checked'
		).value;
		this.date = convertDateInputToObject(
			document.querySelector('input[name="filter-date"]').value
		).toLocaleDateString('PT-BR');
		this.chartType = document.querySelector('#chart-type-filter-select').value;
	}
}

export function handleInputs() {
	const inputs = new UserInputs();
	const mainData = getPrimaryData(inputs.firstFilterOption);
	const secondaryData = getSecondaryData(inputs.secondFilterOption, mainData);
	const resultArray = getFilteredByDateData(
		inputs.dataFilterOption,
		secondaryData[0],
		inputs.date
	);
	const xAxis = resultArray;
	const yAxis = secondaryData[1];

	if (inputs.chartType === 'bar') {
		drawBarChart(
			`${inputs.firstFilterOption} por ${
				inputs.secondFilterOption
			} (totalizando ${xAxis.reduce(
				(ac, i) => ac + i
			)} em ${formatDateByDateFilter(inputs.dataFilterOption, inputs.date)})`,
			xAxis,
			yAxis
		);
	} else if (inputs.chartType === 'pie') {
		drawPieChart(
			`${inputs.firstFilterOption} por ${
				inputs.secondFilterOption
			} (totalizando ${xAxis.reduce(
				(ac, i) => ac + i
			)} em ${formatDateByDateFilter(inputs.dataFilterOption, inputs.date)})`,
			xAxis,
			yAxis
		);
	}
}

function convertDateInputToObject(input) {
	const date = new Date(input + 'T00:00:00');
	const offset = date.getTimezoneOffset();
	date.setMinutes(date.getMinutes() + offset);
	return date;
}

function formatDateByDateFilter(dataFilterOption, dateStr) {
	switch (dataFilterOption) {
		case 'Tudo':
			return 'Todo o Período';
		case 'Dia':
			return `${dateStr.split('/')[0]}/${dateStr.split('/')[1]}/${
				dateStr.split('/')[2]
			}`;
		case 'Mês':
			return `${dateStr.split('/')[1]}/${dateStr.split('/')[2]}`;
	}
}
