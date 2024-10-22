import mongoose from 'mongoose';
import logger from './logger';
import config from '../config/config';

export default async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    mongoose.connect(config.database_uri).then(() => {
      logger.info('Database connection established successfully');
      resolve();
    })
    .catch((error: any) => {
      logger.error(`Unable to connect to  the  database, ${error}`)
    })
  });
}
