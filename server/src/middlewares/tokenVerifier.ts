import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { JWT_SECRET } from 'config/env'
import type { IUserToken } from 'types/jwt'

export const protectedRoute = (req: Request, res: Response, next: any) => {
	try {
		const token = req.cookies.token || ''
		if (!token) throw Error("You have no permissions.")	

		jwt.verify(token, JWT_SECRET)

		next()

	} catch (error: any) {
		res.status(401).json(error.message)
	}
}

export const adminRoute = (req: Request, res: Response, next: any) => {
	try {
		const token = req.cookies.token || ''
		if (!token) throw Error("You have no permissions.")

		const { role } = jwt.verify(token, JWT_SECRET) as IUserToken
		if (role !== 'admin') throw Error("You don't have any permissions.")

		next()

	} catch (error: any) {
		res.status(401).json(error.message)
	}
}