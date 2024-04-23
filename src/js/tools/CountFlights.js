export function getFlightsCount(flightsObject) {
	const countOfFlights = [];
	flightsObject.forEach((obj) => {
		countOfFlights.push(obj.length);
	});
	return countOfFlights;
}
