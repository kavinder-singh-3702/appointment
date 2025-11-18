import { listAppointments, createAppointment } from '../services/appointmentsService.js';

export const getAppointments = async (req, res, next) => {
  try {
    const skip = Math.max(Number.parseInt(req.query.skip, 10) || 0, 0);
    const limit = Math.max(Number.parseInt(req.query.limit, 10) || 10, 1);

    const filters = {
      skip,
      limit,
      search: req.query.search,
      doctor: req.query.doctor,
      status: req.query.status,
      startDate: req.query.start,
      endDate: req.query.end,
    };

    const appointments = await listAppointments(filters);
    res.json({ data: appointments, skip, limit });
  } catch (error) {
    next(error);
  }
};

export const postAppointment = async (req, res, next) => {
  try {
    const created = await createAppointment(req.body || {});
    res.status(201).json({ data: created });
  } catch (error) {
    next(error);
  }
};
