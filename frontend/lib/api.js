const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

const handleResponse = async (response) => {
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const details = Array.isArray(payload?.details) ? payload.details.join(' ') : payload?.error;
    throw new Error(details || 'Request failed');
  }
  return payload?.data ?? null;
};

export const fetchAppointments = async ({
  skip = 0,
  limit = 25,
  search,
  doctor,
  status,
  start,
  end,
} = {}) => {
  const searchParams = new URLSearchParams({ skip: String(skip), limit: String(limit) });
  if (search) searchParams.set('search', search);
  if (doctor) searchParams.set('doctor', doctor);
  if (status) searchParams.set('status', status);
  if (start) searchParams.set('start', start);
  if (end) searchParams.set('end', end);

  const response = await fetch(`${API_BASE_URL}/api/appointments?${searchParams.toString()}`);
  return handleResponse(response);
};

export const fetchDoctors = async () => {
  const response = await fetch(`${API_BASE_URL}/api/doctors`);
  return handleResponse(response);
};

export const createAppointment = async ({ patient_name, doctor, scheduled_at, notes }) => {
  const body = {
    patient_name,
    doctor,
    scheduled_at,
    notes: notes || '',
  };
  const response = await fetch(`${API_BASE_URL}/api/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return handleResponse(response);
};
