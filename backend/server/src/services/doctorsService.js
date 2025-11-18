import { query } from '../config/db.js';

export const listDoctors = async () => {
  const { rows } = await query(
    `SELECT DISTINCT doctor
     FROM appointments
     WHERE doctor IS NOT NULL AND TRIM(doctor) <> ''
     ORDER BY doctor ASC`
  );

  return rows.map((row) => row.doctor);
};
