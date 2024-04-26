export function getFlightsInDate(data, keyName, date, returnCount = false) {
	const flightsArray = data.filter((flight) => {
		const keyNames = [];

		if (keyName === 'chegada') {
			keyNames.push('chegada_prevista');
		} else if (keyName === 'partida') {
			keyNames.push('partida_prevista');
		} else if (keyName === '*') {
			keyNames.push(
				'chegada_prevista',
				'chegada_real',
				'partida_prevista',
				'partida_real'
			);
		}

		return keyNames.some((key) => {
			return flight[key] && date === flight[key];
		});
	});

	return returnCount ? flightsArray.length : flightsArray;
}

export function getFlightsInMonth(data, keyName, date, returnCount = false) {
	const flightsArray = data.filter((flight) => {
		const keyNames = [];

		if (keyName === 'chegada') {
			keyNames.push('chegada_prevista');
		} else if (keyName === 'partida') {
			keyNames.push('partida_prevista');
		} else if (keyName === '*') {
			keyNames.push(
				'chegada_prevista',
				'partida_prevista',
			);
		}

		return keyNames.some((key) => {
			return flight[key] && date.split('/')[1] === flight[key].split('/')[1];
		});
	});

	return returnCount ? flightsArray.length : flightsArray;
}
