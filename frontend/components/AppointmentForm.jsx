'use client';

import { useState } from 'react';

const INITIAL_FORM = {
  patient_name: '',
  doctor: '',
  scheduled_at: '',
  status: 'scheduled',
  notes: '',
};

const AppointmentForm = ({ onSubmit, submitting, error, success, clearMessages }) => {
  const [form, setForm] = useState(INITIAL_FORM);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    clearMessages?.();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await onSubmit(form);
    if (result?.success) {
      setForm(INITIAL_FORM);
    }
  };

  return (
    <section className="card">
      <h1>Hospital Appointments</h1>
      <p className="muted">Create a new appointment and track upcoming visits.</p>

      <form className="form" onSubmit={handleSubmit}>
        <div className="grid">
          <label>
            Patient Name
            <input
              type="text"
              name="patient_name"
              value={form.patient_name}
              onChange={handleChange}
              placeholder="Jane Doe"
              required
            />
          </label>

          <label>
            Doctor
            <input
              type="text"
              name="doctor"
              value={form.doctor}
              onChange={handleChange}
              placeholder="Dr. Lee"
              required
            />
          </label>

          <label>
            Scheduled For
            <input
              type="datetime-local"
              name="scheduled_at"
              value={form.scheduled_at}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Status
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="scheduled">Scheduled</option>
              <option value="checked_in">Checked In</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </label>
        </div>

        <label>
          Notes (optional)
          <textarea
            name="notes"
            rows={3}
            placeholder="Symptoms, visit context, etc."
            value={form.notes}
            onChange={handleChange}
          />
        </label>

        <button type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : 'Schedule appointment'}
        </button>
      </form>

      {error && <p className="alert error">{error}</p>}
      {success && <p className="alert success">{success}</p>}
    </section>
  );
};

export default AppointmentForm;
