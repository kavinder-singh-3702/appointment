import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import appointmentsRouter from './routes/appointments.js';
import doctorsRouter from './routes/doctors.js';
import { notFoundHandler, errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/appointments', appointmentsRouter);
app.use('/api/doctors', doctorsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
