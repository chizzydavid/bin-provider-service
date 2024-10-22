import { Router } from 'express'
import { getBinDetail } from '../controllers/bin.controller';

const router = Router();

router.get('/bins/:binNumber', getBinDetail)

export default router
  