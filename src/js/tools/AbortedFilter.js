export function getAbortedFlights(data, returnCount = false) {
	const abortedFlights = [];

	for (let i = 0; i < data.length; i++) {
		const situation = data[i]['situacao_voo'];
		const justification = data[i]['justificativa'];

		if (situation) {
			if (situation.toLowerCase().match('cancelado'))
				abortedFlights.push(data[i]);
		} else if (justification) {
			if (justification.toLowerCase().match('cancelado'))
				abortedFlights.push(data[i]);
		}
	}

	return returnCount ? abortedFlights.length : abortedFlights;
}
