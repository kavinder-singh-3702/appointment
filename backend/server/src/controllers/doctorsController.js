import { listDoctors } from '../services/doctorsService.js';

export const getDoctors = async (req, res, next) => {
  try {
    const doctors = await listDoctors();
    res.json({ data: doctors });
  } catch (error) {
    next(error);
  }
};
