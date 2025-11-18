'use client';

import StatusBadge from './StatusBadge.jsx';

const AppointmentList = ({ appointments, loading, onRefresh }) => {
  return (
    <section className="card">
      <div className="list-header">
        <h2>Upcoming appointments</h2>
        <button type="button" onClick={onRefresh} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {loading && <p className="muted">Loading appointments…</p>}
      {!loading && appointments.length === 0 && <p className="muted">No appointments scheduled yet.</p>}

      <ul className="list">
        {appointments.map((appointment) => (
          <li key={appointment.id} className="list-item">
            <div>
              <strong>{appointment.patient_name}</strong>
              <p className="muted">{appointment.doctor}</p>
            </div>
            <div className="right">
              <StatusBadge status={appointment.status} />
              <p className="muted small">
                {new Intl.DateTimeFormat('en-US', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                }).format(new Date(appointment.scheduled_at))}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AppointmentList;
