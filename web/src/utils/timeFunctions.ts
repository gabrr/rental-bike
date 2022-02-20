export const combineStartEndPeriod = (startPeriod: Date, endPeriod: Date) => {
	const formatDate = (date: Date) => date.toString().slice(0, 21)
	return `${formatDate(startPeriod)} to ${formatDate(endPeriod)}`	
}