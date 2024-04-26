import Papa from 'papaparse';
import Flight from '../classes/Flight.js';
import { getAbortedFlights } from '../tools/AbortedFilter.js';
import Category from '../classes/Category.js';
import { getFlightsInDate, getFlightsInMonth } from '../tools/DateFilter.js';
import { getFlightsCount } from '../tools/CountFlights.js';

// VRA_2024_01.csv
// testTable.csv
let data = await getFlights('./VRA_2024_01.csv');
console.log(data);

export async function getFlights(filePath) {
	const response = await fetch(filePath);
	const textData = await response.text();

	let data = [];
	Papa.parse(textData, {
		fastMode: true,
		header: true,
		dynamicTyping: true,
		skipEmptyLines: true,
		step: (row) => {
			const newFlight = new Flight(
				row.data['Sigla ICAO Empresa Aérea'],
				row.data['Empresa Aérea'],
				row.data['Número Voo'],
				row.data['Código DI'],
				row.data['Código Tipo Linha'],
				row.data['Modelo Equipamento'],
				row.data['Número de Assentos'],
				row.data['Sigla ICAO Aeroporto Origem'],
				row.data['Descrição Aeroporto Origem'],
				row.data['Partida Prevista'],
				row.data['Partida Real'],
				row.data['Sigla ICAO Aeroporto Destino'],
				row.data['Descrição Aeroporto Destino'],
				row.data['Chegada Prevista'],
				row.data['Chegada Real'],
				row.data['Situação Voo'],
				row.data['Justificativa'],
				row.data['Referência'],
				row.data['Situação Partida'],
				row.data['Situação Chegada']
			);

			data.push(newFlight);
		},
		complete: () => {
			data = data.slice(1);
		},
	});

	return data;
}

export function getPrimaryData(option) {
	switch (option) {
		case 'Voos':
			return data;
		case 'Voos cancelados':
			return getAbortedFlights(data);
	}
}

export function getSecondaryData(option, mainData) {
	switch (option) {
		case 'Companhia': {
			const company = new Category(mainData, 'Companies');
			return [company.flights, company.names];
		}
		case 'Aeroporto de Destino': {
			const airports = new Category(mainData, 'Airports', 'destino');
			return [airports.flights, airports.names];
		}
		case 'Aeroporto de Origem': {
			const airports = new Category(mainData, 'Airports', 'origem');
			return [airports.flights, airports.names];
		}

		case 'Dia de Chegada': {
			const days = new Category(mainData, 'Days', 'chegada');
			return [days.flights, days.names];
		}

		case 'Dia de Partida': {
			const days = new Category(mainData, 'Days', 'partida');
			return [days.flights, days.names];
		}
	}
}

export function getFilteredByDateData(option, mainData, date = null) {
	switch (option) {
		case 'Tudo':
			return [getFlightsCount(mainData), 'Todo o Período'];
		case 'Dia': {
			return [
				mainData.map((elt) => {
					return getFlightsInDate(elt, 'partida', date, true);
				}),
				`${date.getDay().toString().padStart(2, '0')}/${(date.getMonth() + 1)
					.toString()
					.padStart(2, '0')}/${date.getFullYear()}`,
			];
		}
		case 'Mês': {
			return [
				mainData.map((elt) => {
					return getFlightsInMonth(elt, 'partida', date, true);
				}),
				`${(date.getMonth() + 1)
					.toString()
					.padStart(2, '0')}/${date.getFullYear()}`,
			];
		}
	}
}
