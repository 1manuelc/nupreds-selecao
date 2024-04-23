export function getAbortedFlights(data, returnCount = false) {
	const abortedFlights = data.filter((flight) => {
		const situation = flight['situacao_voo'];
		const justification = flight['justificativa'];

		return (
			(situation && situation.toLowerCase().includes('cancelado')) ||
			(justification && justification.toLowerCase().includes('cancelado'))
		);
	});

	return returnCount ? abortedFlights.length : abortedFlights;
}
