import express, { Request, Response } from 'express';
import logger from './logger';
import Database from './db';
import gitRoutes from './routes/github.routes';
import googleRoutes from './routes/google.routes';
import facebookRoutes from './routes/facebook.routes';
import { CONFIG } from './constants';
const { PORT, HOST } = CONFIG;

const setupServer = async (handler: Function) => {
  try{
    const database = Database.getDBInstance();
    const server = express();
    await database.connectToDatabase();
    server.use('/git', gitRoutes);
    server.use('/google',googleRoutes);     
    server.use('/facebook', facebookRoutes);
    server.get('*', (req: Request, res: Response) =>  handler(req, res));
    const appServer = server.listen(parseInt(PORT, 10), HOST, (error) => {
        if(error) {
            logger.error(error.message);
            process.exit(1);
        }
        logger.info(`Server started. Running on http://${HOST}:${PORT}`);
    });
    return appServer;
  } catch(err) {
    logger.error('Error: ', err.message);
  }
  
}


export default setupServer;