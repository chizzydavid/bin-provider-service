import BinService from '../services/bin.service';
import { Request, Response, NextFunction} from 'express';
import logger from '../utils/logger';


export const getBinDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const binNum = req.params.binNumber;
    if (!binNum) {
      res.status(400).json({ error: 'BIN is required' })
      return
    }
    if (binNum && binNum.length < 6 || binNum.length > 8) {
      res.status(400).json({ error: 'Invalid BIN' })
      return
    }
    const result = await BinService.getBinDetail(binNum);
    if (!result) {
      res.status(404).json({ error: 'BIN not found' })
      return
    }
    res.status(200).json({ data: result });
  } catch (error) {
    logger.error(error as string);
    res.status(500).json({ error: 'Something went wrong, please try again' })
  }
};


