import { getFlightsCount } from '../tools/CountFlights';

export default class Companies {
	companies = [];
	flightsCountByCompany = [];
	flights = [];

	constructor(data) {
		this.companies = getCompanyNames(data, false);
		this.flights = getFlightObjects(data, this.companies);
		this.flightsCountByCompany = getFlightsCount(this.flights);
	}
}

function getCompanyNames(data) {
	let companiesVector = [];

	for (let i = 0; i < data.length; i++) {
		const flight = data[i];
		const actCompanyName = flight.empresa_aerea;
		if (companiesVector.includes(actCompanyName));
		else companiesVector.push(actCompanyName);
	}

	return companiesVector;
}

function getFlightObjects(data, companies) {
	const flightsInCompany = [];

	for (let i = 0; i < companies.length; i++) {
		const companyFlights = [];
		for (let j = 0; j < data.length; j++)
			if (companies[i] === data[j].empresa_aerea) companyFlights.push(data[j]);

		flightsInCompany.push(companyFlights);
	}

	return flightsInCompany;
}
