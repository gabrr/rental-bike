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
				const user = await User.findOne({ email: req.body.email })

				if (error) throw Error(error.details[0].message)
				if (!user) throw Error('E-mail or password invalid.')

				const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
				if (!isPasswordValid) throw Error('E-mail or password invalid.')

				const token = jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET)

				res.header('auth-token', token)
				return res.json(user)

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
					return res.json({ error, user: userCreated  })
            
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
				const { error } = signUpValidation(req.body)
				if (error) throw Error(error.details[0].message)
				
				const newUser = await new User(req.body)
				newUser.save()

				return res.json({ User: newUser })

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