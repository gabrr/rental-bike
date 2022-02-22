import { Express } from 'express';
import { NODE_ENV, PORT } from 'config/env';

export default (server: Express) => {

    try {
        server.listen(PORT, () => console.info(`INFO - Server started on port: ${ PORT } [${ NODE_ENV }]`))    
    } catch (error) {
        console.error('ERROR - Unable to start server.', error)
    }
}
    