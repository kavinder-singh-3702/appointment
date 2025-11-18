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

export const listAppointments = async ({
  skip = 0,
  limit = 10,
  search,
  doctor,
  status,
  startDate,
  endDate,
}) => {
  const parsedSkip = Number.isFinite(skip) ? skip : 0;
  const parsedLimit = Number.isFinite(limit) && limit > 0 ? limit : 10;

  const conditions = [];
  const values = [];

  if (search && typeof search === 'string' && search.trim()) {
    values.push(`%${search.trim()}%`);
    conditions.push(`patient_name ILIKE $${values.length}`);
  }

  if (doctor && typeof doctor === 'string' && doctor.trim()) {
    values.push(doctor.trim());
    conditions.push(`doctor ILIKE $${values.length}`);
  }

  if (status && typeof status === 'string' && status.trim()) {
    values.push(status.trim());
    conditions.push(`status = $${values.length}`);
  }

  if (startDate) {
    const start = new Date(startDate);
    if (!Number.isNaN(start.getTime())) {
      values.push(start);
      conditions.push(`scheduled_at >= $${values.length}`);
    }
  }

  if (endDate) {
    const end = new Date(endDate);
    if (!Number.isNaN(end.getTime())) {
      values.push(end);
      conditions.push(`scheduled_at <= $${values.length}`);
    }
  }

  let sql = `SELECT id, patient_name, doctor, scheduled_at, status, notes, created_at
             FROM appointments`;

  if (conditions.length) {
    sql += ` WHERE ${conditions.join(' AND ')}`;
  }

  values.push(parsedSkip);
  const offsetPlaceholder = `$${values.length}`;
  values.push(parsedLimit);
  const limitPlaceholder = `$${values.length}`;

  sql += ` ORDER BY scheduled_at ASC OFFSET ${offsetPlaceholder} LIMIT ${limitPlaceholder}`;

  const { rows } = await query(sql, values);

  return rows;
};

export const createAppointment = async ({ patient_name, doctor, scheduled_at, notes }) => {
  const errors = validateAppointmentPayload({ patient_name, doctor, scheduled_at });
  if (errors.length) {
    const error = new Error('Validation error');
    error.status = 400;
    error.details = errors;
    throw error;
  }

  const { rows } = await query(
    `INSERT INTO appointments (patient_name, doctor, scheduled_at, notes)
     VALUES ($1, $2, $3, $4)
     RETURNING id, patient_name, doctor, scheduled_at, status, notes, created_at`,
    [patient_name.trim(), doctor.trim(), new Date(scheduled_at), notes || null]
  );

  return rows[0];
};
