// TODO: Substituir loops por métodos nativos de arrays

export class Airports {
	airports = [];
	flightsCountByAirport = [];
	flights = [];

	constructor(data, keyName) {
		if (keyName === 'origem') keyName = 'descricao_aeroporto_origem';
		else if (keyName === 'destino') keyName = 'descricao_aeroporto_destino';
		else throw new Error('Inexistent category');

		this.airports = getAirportsNames(data, keyName);
		this.flights = getFlightObjects(data, this.airports, keyName);
		this.flightsCountByAirport = getFlightsCount(this.flights);
	}
}

function getAirportsNames(data, keyName) {
	let airportsVector = [];

	for (let i = 0; i < data.length; i++) {
		const flight = data[i];
		if (airportsVector.includes(flight[keyName]));
		else airportsVector.push(flight[keyName]);
	}

	return airportsVector;
}

function getFlightObjects(data, airports, keyName) {
	const flightsInAirport = [];

	for (let i = 0; i < airports.length; i++) {
		const airportFlights = [];
		for (let j = 0; j < data.length; j++)
			if (airports[i] === data[j][keyName]) airportFlights.push(data[j]);

		flightsInAirport.push(airportFlights);
	}

	return flightsInAirport;
}

function getFlightsCount(flightsObject) {
	const countOfFlights = [];
	for (let i = 0; i < flightsObject.length; i++)
		countOfFlights.push(flightsObject[i].length);
	return countOfFlights;
}
