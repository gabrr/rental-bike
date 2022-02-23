import mongoose from "mongoose"

const bikeSchema = new mongoose.Schema({
	id: String,
	name: String,
	model: String,
	color: String,
	img: String,
	address: String,
	rating: {
		userId: String,
		rate: Number,
	}
}, { timestamps: true })

export default mongoose.model('Bike', bikeSchema)