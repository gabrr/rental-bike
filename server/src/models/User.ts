import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
		name: String,
    email: {
			type: String,
			unique: true
    },
		role: String,
    password: {
			type: String,
			select: false
		},
}, { timestamps: true })

export default mongoose.model('User', userSchema)