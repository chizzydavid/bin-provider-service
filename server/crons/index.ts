import * as fs from 'fs';
import csv from 'csv-parser';
import { IBinData } from '../types';
import { BIN_PROCESSING_BATCH_SIZE as batchSize } from '../utils/constants';
import { resolve } from 'path';
import BinService from '../services/bin.service';
import logger from '../utils/logger';


export const dailyBinDumpUpdate = async () => {
  try {
    // Logic to fetch daily dump data from  BinWorld; using sample dump generated 
    const parentDir = resolve()
    const filePath = `${parentDir}/server/dumps/bin_daily_update_sample.csv`;

    let currentBatch: IBinData[] = [];

    // READ dump file and accumulate rows into batches of ${batchSize} for bulk insert/update to the database
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', async (data: IBinData) => {
        currentBatch.push(data);
        if (currentBatch.length === batchSize) {
          await BinService.bulkUpdate(currentBatch)
          currentBatch = []; 
        }
      })
      .on('end', async () => {
        if (currentBatch.length > 0) {
          await BinService.bulkUpdate(currentBatch)
          currentBatch = [];
        }
      })
      .on('error', (error) => logger.error('Failed to update bin dump: ', error));
  } catch(error: any) {
    logger.error('Error loading dump', error)
    throw error
  }
}

export const initialBinDump = async () => {
  try {
    const parentDir = resolve()
    const filePath = `${parentDir}/server/dumps/bin_initial_dump_sample.csv`;
    let currentBatch: IBinData[] = [];
    const initialDumpLoaded = await BinService.databaseSeeded()
    if (initialDumpLoaded) return;
  
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', async (data: IBinData) => {
        currentBatch.push(data);
        if (currentBatch.length === batchSize) {
          await BinService.bulkCreate(currentBatch)
          currentBatch = []; 
        }
      })
      .on('end', async () => {
        if (currentBatch.length > 0) {
          await BinService.bulkCreate(currentBatch)
          currentBatch = [];         
        }
      })
      .on('error', (error) => logger.error('Failed to load bin dump: ', error));

    logger.info('Initial BIN dump loaded to database')
  } catch(error) {
    logger.error('Error loading dump', error)
    throw error
  }
}

