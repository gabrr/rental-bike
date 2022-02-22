import { Express } from "express"
import routes from 'routes';

export default (server: Express) => server.use(routes)