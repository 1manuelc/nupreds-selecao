import { getFlightsCount } from '../tools/CountFlights';

export default class Days {
	days = [];
	flightsCountByDay = [];
	flights = [];

	constructor(data, keyName) {
		this.days = getDays(data, keyName);
		this.flights = getFlights(this.days, data, keyName);
		this.flightsCountByDay = getFlightsCount(this.flights);
	}
}

function getDays(data, keyName) {
	const daysArray = [];
	const keyNames = getPossibleKeynames(keyName);

	for (let i = 0; i < data.length; i++) {
		let flight = data[i];
		for (let j = 0; j < keyNames.length; j++) {
			let actualDate = flight[keyNames[j]];
			if (actualDate) {
				let dateString = actualDate.toLocaleDateString('PT-BR');
				if (daysArray.includes(dateString)) break;
				else daysArray.push(dateString);
			}
		}
	}
	return daysArray;
}

function getPossibleKeynames(keyName) {
	const keyNames = [];

	if (keyName === 'chegada') {
		keyNames.push('chegada_prevista');
	} else if (keyName === 'partida') {
		keyNames.push('partida_prevista');
	} else if (keyName === '*') {
		keyNames.push('chegada_prevista');
		keyNames.push('partida_prevista');
	}

	return keyNames;
}

function getFlights(days, data, keyName) {
	const flightsInDays = [];
	const keyNames = getPossibleKeynames(keyName);

	for (let k = 0; k < days.length; k++) {
		const flightsInDay = [];
		const day = days[k];

		for (let i = 0; i < data.length; i++) {
			const flight = data[i];

			let keyNameWasFound = false;
			if (!keyNameWasFound) {
				for (let j = 0; j < keyNames.length; j++) {
					const key = keyNames[j];
					if (flight[key]) {
						if (flight[key].toLocaleDateString('PT-BR') === day) {
							flightsInDay.push(flight);
							keyNameWasFound = true;
						}
					}
				}
			} else break;
		}
		flightsInDays.push(flightsInDay);
	}

	return flightsInDays;
}
