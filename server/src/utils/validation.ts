import Joi from "joi"

export const signUpValidation = (body: any) => {
	
	const schema =  Joi.object({
		name: Joi.string().min(2).required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(6),
	})

	return schema.validate(body)
}

export const signInValidation = (body: any) => {
	
	const schema =  Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().min(6).required(),
	})

	return schema.validate(body)
}

export const editUserValidation = (body: any) => {
	
	const schema = Joi.object({
		name: Joi.string().min(2).required(),
		role: Joi.string().valid('admin', 'user')
	})

	return schema.validate(body)
}

export const createUserValidation = (body: any) => {
	
	const schema = Joi.object({
		name: Joi.string().min(2).required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(6),
		role: Joi.string().valid('admin', 'user')
	})

	return schema.validate(body)
}

export const createBikeValidation = (body: any) => {
	
	const schema = Joi.object({
		name: Joi.string().min(4).required(),
		model: Joi.string().min(1).required(),
		color: Joi.string().min(3).required(),
		img: Joi.string(),
		address: Joi.string().required(),
	})

	return schema.validate(body)
}

export const editBikeValidation = (body: any) => {
	
	const schema = Joi.object({
		name: Joi.string().min(4),
		model: Joi.string().min(1),
		color: Joi.string().min(3),
		img: Joi.string(),
		address: Joi.string(),
	})

	return schema.validate(body)
}

export const rateBikeValidation = (body: any) => {
	
	const schema = Joi.object({
		rate: Joi.number().required(),
	})

	return schema.validate(body)
}

export const createReservationValidation = (body: any) => {
	
	const schema = Joi.object({
		userId: Joi.string().required(),
		bikeId: Joi.string().required(),
		startPeriod: Joi.string().isoDate().required(),
		endPeriod: Joi.string().isoDate().required(),
	})

	return schema.validate(body)
}

export const editReservationValidation = (body: any) => {
	
	const schema = Joi.object({
		userId: Joi.string(),
		bikeId: Joi.string(),
		startPeriod: Joi.string().isoDate(),
		endPeriod: Joi.string().isoDate(),
	})

	return schema.validate(body)
}