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

		if (this.firstFilterOption === '')
			throw new Error('Por favor, escolha um Filtro Primário');
		if (this.secondFilterOption === '')
			throw new Error('Por favor, escolha um Filtro Secundário');
		if (this.dataFilterOption !== 'Tudo' && this.date === 'Invalid Date')
			throw new Error('Por favor, escolha uma Data válida');
	}
}

export function handleInputs() {
	try {
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
				)} em ${formatDateToChartTitle(inputs.dataFilterOption, inputs.date)})`,
				xAxis,
				yAxis
			);
		} else if (inputs.chartType === 'pie') {
			drawPieChart(
				`${inputs.firstFilterOption} por ${
					inputs.secondFilterOption
				} (totalizando ${xAxis.reduce(
					(ac, i) => ac + i
				)} em ${formatDateToChartTitle(inputs.dataFilterOption, inputs.date)})`,
				xAxis,
				yAxis
			);
		}

		showErrorMessage(false);
	} catch (error) {
		showErrorMessage(true, error);
	}
}

function convertDateInputToObject(input) {
	const date = new Date(input + 'T00:00:00');
	const offset = date.getTimezoneOffset();
	date.setMinutes(date.getMinutes() + offset);
	return date;
}

function formatDateToChartTitle(dataFilterOption, dateStr) {
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

function showErrorMessage(willShow, error = null) {
	const container = document.querySelector('#error-container');
	if (willShow) {
		container.classList.add('visible');
		document.querySelector('#error-message').innerHTML = error;
	} else container.classList.remove('visible');
}
