import { Router } from 'express';
import { getDoctors } from '../controllers/doctorsController.js';

const router = Router();

router.get('/', getDoctors);

export default router;
