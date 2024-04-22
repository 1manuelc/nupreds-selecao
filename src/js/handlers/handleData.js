import Papa from 'papaparse';
import Flight from '../classes/Flight.js';
import { getAbortedFlights } from '../tools/AbortedFilter.js';
import Companies from '../classes/Companies.js';
import { Destinations } from '../classes/Destinations.js';
import { getFlightsInDate, getFlightsInMonth } from '../tools/DateFilter.js';
import { getFlightsCount } from '../tools/CountFlights.js';
import Days from '../classes/Days.js';

// VRA_2024_01.csv
// testTable.csv
let data = await getFlights('./VRA_2024_01.csv');

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

export function getPrimaryData(option, secondData = null, dateModifier = null) {
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
			const company = new Companies(mainData);
			return [company.flights, company.companies];
		}
		case 'Aeroporto de Destino': {
			const destiny = new Destinations(mainData, 'destino');
			return [destiny.flights, destiny.destinations];
		}
		case 'Aeroporto de Origem': {
			const destiny = new Destinations(mainData, 'origem');
			return [destiny.flights, destiny.destinations];
		}

		case 'Dia de Chegada': {
			const days = new Days(mainData, 'chegada');
			return [days.flights, days.days];
		}

		case 'Dia de Partida': {
			const days = new Days(mainData, 'partida');
			return [days.flights, days.days];
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
					return getFlightsInMonth(elt, 'partida', date.getMonth(), true);
				}),
				`${(date.getMonth() + 1)
					.toString()
					.padStart(2, '0')}/${date.getFullYear()}`,
			];
		}
	}
}
