/**
 *
 * @param {Array} data
 * @param {String} keyName
 * @param {Date} date
 * @returns
 */
export function getFlightsInDate(data, keyName, date, returnCount = false) {
	const flightsArray = [];
	const keyNames = [];
	if (keyName === 'chegada') {
		keyNames.push('chegada_prevista');
		keyNames.push('chegada_real');
	} else if (keyName === 'partida') {
		keyNames.push('partida_prevista');
		keyNames.push('partida_real');
	} else if (keyName === '*') {
		keyNames.push('chegada_prevista');
		keyNames.push('chegada_real');
		keyNames.push('partida_prevista');
		keyNames.push('partida_real');
	}

	for (let i = 0; i < data.length; i++) {
		let keyNameWasFound = false;
		if (!keyNameWasFound) {
			for (let j = 0; j < keyNames.length; j++) {
				if (data[i][keyNames[j]]) {
					if (
						date.toDateString().startsWith(data[i][keyNames[j]].toDateString())
					) {
						keyNameWasFound = true;
						flightsArray.push(data[i]);
					}
				}
			}
		} else continue;
	}

	return returnCount ? flightsArray.length : flightsArray;
}

export function getFlightsInMonth(data, keyName, month, returnCount = false) {
	let flightsArray = [];
	let keyNames = [];

	if (keyName === 'chegada') {
		keyNames.push('chegada_prevista');

	} else if (keyName === 'partida') {
		keyNames.push('partida_prevista');
	} else if (keyName === '*') {
		keyNames.push('chegada_prevista');
		keyNames.push('partida_prevista');
	}

	for (let i = 0; i < data.length; i++) {
		let keyNameWasFound = false;
		if (!keyNameWasFound) {
			for (let j = 0; j < keyNames.length; j++) {
				if (data[i][keyNames[j]]) {
					if (data[i][keyNames[j]].getMonth() === month) {
						keyNameWasFound = true;
						flightsArray.push(data[i]);
					}
				}
			}
		} else continue;
	}

	return returnCount ? flightsArray.length : flightsArray;
}
