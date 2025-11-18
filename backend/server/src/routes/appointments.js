import { Router } from 'express';
import { getAppointments, postAppointment } from '../controllers/appointmentsController.js';

const router = Router();

router.get('/', getAppointments);
router.post('/', postAppointment);

export default router;
