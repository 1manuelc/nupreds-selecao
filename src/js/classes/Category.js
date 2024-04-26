import { getFlightsCount } from '../tools/CountFlights';

export default class Category {
	category;
	keynames;
	names = [];
	flights = [];
	flightsCountByNames = [];

	constructor(data, category, key = null) {
		this.category = category;
		this.keynames = getKeynamesByCategory(this.category, key);
		this.names = getCategoryNamesByColumn(data, this.keynames);
		this.flights = getFlightObjectsByCategoryNames(
			data,
			this.names,
			this.keynames
		);
		this.flightsCountByNames = getFlightsCount(this.flights);
	}
}

function getCategoryNamesByColumn(data, keynames) {
	let nameResults = [];

	data.forEach((flight) => {
		keynames.some((key) => {
			if (!nameResults.includes(flight[key])) nameResults.push(flight[key]);
		});
	});

	return nameResults;
}

function getFlightObjectsByCategoryNames(data, names, keynames) {
	const objectsResult = [];

	names.forEach((name) => {
		const thisNameResults = [];

		data.forEach((flight) => {
			keynames.some((key) => {
				if (name === flight[key]) {
          thisNameResults.push(flight);
				}
			});
		});

		objectsResult.push(thisNameResults);
	});

	return objectsResult;
}

function getKeynamesByCategory(category, key) {
	switch (category) {
		case 'Airports': {
			if (key === 'origem') return ['descricao_aeroporto_origem'];
			else if (key === 'destino') return ['descricao_aeroporto_destino'];
			else throw new Error('Inexistent category');
		}
		case 'Days': {
			if (key === 'chegada') {
				return ['chegada_prevista'];
			} else if (key === 'partida') {
				return ['partida_prevista'];
			} else if (key === '*') {
				return [
					'chegada_prevista',
					'partida_prevista',
				];
			}
		}
		case 'Companies': {
			return ['empresa_aerea'];
		}
	}
}
