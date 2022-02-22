// types
import { Express } from 'express'
import path from 'path'

import { CLIENT_URL } from 'config/env'

// middlewares
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'

export default (server: Express) => {
    server.use(express.json())
    server.use(cors({ origin: CLIENT_URL, credentials: true }))
		server.use('/static', express.static(path.join(__dirname, '.', '..', 'uploads')))
    server.use(cookieParser())
}