import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import connectToDatabase from './utils/database';
import logger from './utils/logger';
import app from './app';
import initCronJobs from './crons/scheduler';
import cronConfig from './crons/config'


const server = http.createServer(app);

const PORT: number = parseInt(process.env.PORT!);

server.listen(PORT);

server.on('listening', async () => {
  await connectToDatabase();
  await initCronJobs(cronConfig)

  logger.info(`Application listening on port ${PORT}`);
});

server.on('close', () => {
  logger.info('Application server closed');
});
