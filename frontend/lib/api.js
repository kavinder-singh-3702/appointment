const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

const handleResponse = async (response) => {
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const details = Array.isArray(payload?.details) ? payload.details.join(' ') : payload?.error;
    throw new Error(details || 'Request failed');
  }
  return payload?.data ?? null;
};

export const fetchAppointments = async ({ skip = 0, limit = 25 } = {}) => {
  const searchParams = new URLSearchParams({ skip: String(skip), limit: String(limit) });
  const response = await fetch(`${API_BASE_URL}/api/appointments?${searchParams.toString()}`);
  return handleResponse(response);
};

export const createAppointment = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/api/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
};
