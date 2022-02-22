// types
import { Express } from 'express';

// middlewares
import cors from 'cors'
import express from 'express';

export default (server: Express) => {
    server.use(express.json())
    server.use(cors())
}