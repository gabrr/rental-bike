import mongoose from "mongoose"

const rservationSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
	},
	bikeId: {
		type: String,
		required: true,
	},
	startPeriod: {
		type: String,
		required: true,
	},
	endPeriod: {
		type: String,
		required: true,
	},
}, { timestamps: true })

export default mongoose.model('Reservation', rservationSchema)