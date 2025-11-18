import { query } from '../config/db.js';

export const validateAppointmentPayload = ({ patient_name, doctor, scheduled_at }) => {
  const errors = [];

  if (!patient_name || typeof patient_name !== 'string' || !patient_name.trim()) {
    errors.push('patient_name is required.');
  }

  if (!doctor || typeof doctor !== 'string' || !doctor.trim()) {
    errors.push('doctor is required.');
  }

  if (!scheduled_at) {
    errors.push('scheduled_at is required.');
  } else {
    const date = new Date(scheduled_at);
    if (Number.isNaN(date.getTime())) {
      errors.push('scheduled_at must be a valid datetime.');
    } else if (date.getTime() <= Date.now()) {
      errors.push('scheduled_at must be in the future.');
    }
  }

  return errors;
};

export const listAppointments = async ({ skip = 0, limit = 10 }) => {
  const parsedSkip = Number.isFinite(skip) ? skip : 0;
  const parsedLimit = Number.isFinite(limit) && limit > 0 ? limit : 10;

  const { rows } = await query(
    `SELECT id, patient_name, doctor, scheduled_at, status, notes, created_at
     FROM appointments
     ORDER BY scheduled_at ASC
     OFFSET $1 LIMIT $2`,
    [parsedSkip, parsedLimit]
  );

  return rows;
};

export const createAppointment = async ({ patient_name, doctor, scheduled_at, status, notes }) => {
  const errors = validateAppointmentPayload({ patient_name, doctor, scheduled_at });
  if (errors.length) {
    const error = new Error('Validation error');
    error.status = 400;
    error.details = errors;
    throw error;
  }

  const { rows } = await query(
    `INSERT INTO appointments (patient_name, doctor, scheduled_at, status, notes)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, patient_name, doctor, scheduled_at, status, notes, created_at`,
    [patient_name.trim(), doctor.trim(), new Date(scheduled_at), status || 'scheduled', notes || null]
  );

  return rows[0];
};
