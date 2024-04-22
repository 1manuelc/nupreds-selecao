export function getFlightsCount(flightsObject) {
	const countOfFlights = [];
	for (let i = 0; i < flightsObject.length; i++)
		countOfFlights.push(flightsObject[i].length);
	return countOfFlights;
}
