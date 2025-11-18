'use client';

import { useState } from 'react';

const INITIAL_FORM = {
  patient_name: '',
  doctor: '',
  scheduled_at: '',
  notes: '',
};

const AppointmentForm = ({ onSubmit, submitting, error, clearMessages, onSuccess }) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [validationError, setValidationError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setValidationError(null);
    clearMessages?.();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedName = form.patient_name.trim();
    const trimmedDoctor = form.doctor.trim();
    const date = form.scheduled_at ? new Date(form.scheduled_at) : null;

    if (!trimmedName || !trimmedDoctor || !form.scheduled_at) {
      setValidationError('Patient name, doctor, and schedule time are required.');
      return;
    }

    if (!date || Number.isNaN(date.getTime()) || date.getTime() <= Date.now()) {
      setValidationError('Scheduled time must be a valid future date.');
      return;
    }

    setValidationError(null);

    const result = await onSubmit({
      ...form,
      patient_name: trimmedName,
      doctor: trimmedDoctor,
    });
    if (result?.success) {
      setForm(INITIAL_FORM);
      onSuccess?.();
    }
  };

  return (
    <section>
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

        <button type="submit" className="primary" disabled={submitting}>
          {submitting ? 'Saving...' : 'Schedule appointment'}
        </button>
      </form>

      {validationError && <p className="alert error">{validationError}</p>}
      {error && <p className="alert error">{error}</p>}
    </section>
  );
};

export default AppointmentForm;
