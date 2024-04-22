export class Destinations {
	destinations = [];
	flightsCountByDestination = [];
	flights = [];

	constructor(data, keyName) {
		if (keyName === 'origem') keyName = 'descricao_aeroporto_origem';
		else if (keyName === 'destino') keyName = 'descricao_aeroporto_destino';
		else throw new Error('Inexistent category');

		this.destinations = getDestinationsNames(data, keyName);
		this.flights = getFlightObjects(data, this.destinations, keyName);
		this.flightsCountByDestination = getFlightsCount(this.flights);
	}
}

function getDestinationsNames(data, keyName) {
	let destinationsVector = [];

	for (let i = 0; i < data.length; i++) {
		const flight = data[i];
		if (destinationsVector.includes(flight[keyName]));
		else destinationsVector.push(flight[keyName]);
	}

	return destinationsVector;
}

function getFlightObjects(data, destinations, keyName) {
	const flightsInDestiny = [];

	for (let i = 0; i < destinations.length; i++) {
		const destinyFlights = [];
		for (let j = 0; j < data.length; j++)
			if (destinations[i] === data[j][keyName]) destinyFlights.push(data[j]);

		flightsInDestiny.push(destinyFlights);
	}

	return flightsInDestiny;
}

function getFlightsCount(flightsObject) {
	const countOfFlights = [];
	for (let i = 0; i < flightsObject.length; i++)
		countOfFlights.push(flightsObject[i].length);
	return countOfFlights;
}
