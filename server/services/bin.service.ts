import BinModel from '../models/bin.model';
import { IBinData } from '../types';
import logger from '../utils/logger';


export const databaseSeeded = async() => {
  try {
    const result = await BinModel.countDocuments({});
    if (!result || result === 0) return false;
    return true
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const getBinDetail = async(binNumber: string) => {
  try {
    const result = await BinModel.findOne(
      { bin_number: { $regex: binNumber, $options: 'i' } }
    )
    if (!result) return null;
    return result;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const bulkCreate = async (payload: IBinData[]) => {
  try {
    await BinModel.insertMany(payload);
    return true;
  } catch (error: any) {
    logger.error('Failed to bulk insert', error)
    throw new Error(error.toString())
  }
}


export const bulkUpdate = async (payload: IBinData[]) => {
  try {
    const bulkOps = payload.map((bin) => {
      return {
        updateOne: {
          filter: { bin_number: bin.bin_number }, 
          update: { $set: bin }, 
          upsert: true
        }
      };
    });

    await BinModel.bulkWrite(bulkOps);
    return true

  } catch (error: any) {
    logger.error('Failed to bulk update bins', error)
    throw new Error(error)
  }
}

export default {
  databaseSeeded,
  getBinDetail,
  bulkCreate,
  bulkUpdate
};
