'use client';

import AppointmentForm from '../../components/AppointmentForm.jsx';
import AppointmentList from '../../components/AppointmentList.jsx';
import { useAppointments } from '../../hooks/useAppointments.js';

export default function AppointmentsPage() {
  const { appointments, loading, submitting, error, success, loadAppointments, addAppointment, clearMessages } =
    useAppointments();

  return (
    <main className="page">
      <AppointmentForm
        onSubmit={addAppointment}
        submitting={submitting}
        error={error}
        success={success}
        clearMessages={clearMessages}
      />

      <AppointmentList appointments={appointments} loading={loading} onRefresh={loadAppointments} />
    </main>
  );
}
