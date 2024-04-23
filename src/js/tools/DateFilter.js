export function getFlightsInDate(data, keyName, date, returnCount = false) {
	const flightsArray = data.filter((flight) => {
		const keyNames = [];

		if (keyName === 'chegada') {
			keyNames.push('chegada_prevista', 'chegada_real');
		} else if (keyName === 'partida') {
			keyNames.push('partida_prevista', 'partida_real');
		} else if (keyName === '*') {
			keyNames.push(
				'chegada_prevista',
				'chegada_real',
				'partida_prevista',
				'partida_real'
			);
		}

		return keyNames.some((key) => {
			return flight[key] && date.toDateString() === flight[key].toDateString();
		});
	});

	return returnCount ? flightsArray.length : flightsArray;
}

export function getFlightsInMonth(data, keyName, date, returnCount = false) {
	const flightsArray = data.filter((flight) => {
		const keyNames = [];

		if (keyName === 'chegada') {
			keyNames.push('chegada_prevista', 'chegada_real');
		} else if (keyName === 'partida') {
			keyNames.push('partida_prevista', 'partida_real');
		} else if (keyName === '*') {
			keyNames.push(
				'chegada_prevista',
				'chegada_real',
				'partida_prevista',
				'partida_real'
			);
		}

		return keyNames.some((key) => {
			return flight[key] && date.getMonth() === flight[key].getMonth();
		});
	});

	return returnCount ? flightsArray.length : flightsArray;
}
