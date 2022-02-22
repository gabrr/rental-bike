import User from 'models/User'
import { signUpValidation, signInValidation, editUserValidation } from 'utils/validation'
import { Request, Response } from 'express'
import { JWT_SECRET } from 'config/env'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class UserController {
    async index(req: Request, res: Response ) {
        try {
					const users = await User.find()
           return res.json(users)

        } catch (error: any) {
					return res.status(400).json(error.message)
        }
    }

		async signIn(req: Request, res: Response) {
			try {
				
				const { error } = signInValidation(req.body)
				const user = await User.findOne({ email: req.body.email }).select('+password').exec();

				if (error) throw Error(error.details[0].message)
				if (!user) throw Error('E-mail or password invalid.')

				const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
				if (!isPasswordValid) throw Error('E-mail or password invalid.')

				const token = jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "2h" })

				res.cookie('token', token, { maxAge: 60 * 60 * 24 * 7, httpOnly: true });

				const { password, ...userPL } = user._doc
				return res.json(userPL)

			} catch (error: any) {
				return res.status(400).json(error.message)
			}
		}

    async signUp(req: Request, res: Response) {
        try {
					const isEmailExisting = await User.findOne({ email: req.body.email })

					const { error } = signUpValidation(req.body)

					if (error) throw Error(error.details[0].message)
					if (isEmailExisting) throw Error('E-mail unavailable.')

					const hashedPassword = await bcrypt.hashSync(req.body.password, 10)
					
					const newUser = {
						...req.body,
						password: hashedPassword
					}

					const userCreated = new User(newUser)
					await userCreated.save()
					
					const token = jwt.sign({ _id: userCreated._id, role: userCreated.role }, JWT_SECRET, { expiresIn: "2h" })
					res.cookie('token', token, { maxAge: 60 * 60 * 24 * 7, httpOnly: true });

					const { password, ...userCreatedPL } = userCreated._doc
					return res.json({ error, user: userCreatedPL  })
            
        } catch (error: any) {
            return res.status(400).json(error.message)
        }

    }

		async deleteUser(req: Request, res: Response) {
			try {
				const userId = req.params.userId
				await User.deleteOne({ _id: userId })

				res.json('User deleted!')

			} catch (error: any) {
				return res.json(error.message)
			}
		}

		async createUser(req: Request, res: Response) {
			try {
				const isEmailExisting = await User.findOne({ email: req.body.email })

				const { error } = signUpValidation(req.body)

				if (error) throw Error(error.details[0].message)
				if (isEmailExisting) throw Error('E-mail unavailable.')

				const hashedPassword = await bcrypt.hashSync(req.body.password, 10)
				
				const newUser = {
					...req.body,
					password: hashedPassword
				}

				const userCreated = new User(newUser)
				await userCreated.save()

				const { password, ...userCreatedPL } = userCreated._doc
				return res.json({ error, user: userCreatedPL  })

			} catch (error: any) {
				return res.json(error.message)
			}
		}

		async editUser(req: Request, res: Response) {
			try {
				const userId = req.params.userId
				const updatedUser = req.body

				const { error } = editUserValidation(req.body)
				if (error) throw Error(error.details[0].message)

				const newUser = await User.findByIdAndUpdate(userId, updatedUser, { new: true })
				return res.json(newUser)

			} catch (error: any) {
				return res.json(error.message)
			}
		}
}

export default new UserController()