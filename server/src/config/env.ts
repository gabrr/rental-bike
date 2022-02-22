import { config } from "dotenv"

config()

// Environment
export const NODE_ENV = process.env.NODE_ENV || 'dev'

// Port
export const PORT = process.env.PORT || 8000

// Database
export const DB_HOST = process.env.DB_HOST || 'mongodb://127.0.0.1:27017/biker'

// JWT Secret
export const JWT_SECRET = process.env.JWT_SECRET || ''

export const CLIENT_URL = 'http://localhost:3000'