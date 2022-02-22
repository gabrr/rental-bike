import mongoose from 'mongoose'
import { DB_HOST } from 'config/env'


export default (async () => await mongoose.connect(DB_HOST || '', {
	useUnifiedTopology: true,
	useNewUrlParser: true
} as {})
	.then(() => console.log('Connected to database'))
	.catch((err: any) => console.error(err)))()
