import { IBike } from "types"

export const bikeRateAverage = (bike: IBike) => {
	if (!bike || !bike?.rating) return 0
	const sum = bike.rating.reduce((acc, rating) => acc + rating.rate, 0);
	return (sum / bike.rating.length) || 0;
}