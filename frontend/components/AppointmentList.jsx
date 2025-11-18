'use client';

import StatusBadge from './StatusBadge.jsx';

const AppointmentList = ({ appointments = [], loading, onRefresh, onCreate }) => {
  return (
    <section className="card">
      <div className="list-header">
        <div>
          <h2>Upcoming appointments</h2>
          <p className="muted small">Keep track of patients and clinicians at a glance.</p>
        </div>
        <div className="list-actions">
          <button type="button" className="ghost" onClick={onRefresh} disabled={loading}>
            {loading ? 'Refreshing…' : 'Refresh'}
          </button>
          <button type="button" onClick={onCreate}>
            Create appointment
          </button>
        </div>
      </div>

      {loading && <p className="muted">Loading appointments…</p>}
      {!loading && appointments.length === 0 && <p className="muted">No appointments scheduled yet.</p>}

      {!loading && appointments.length > 0 && (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Scheduled</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>
                    <strong>{appointment.patient_name}</strong>
                  </td>
                  <td>{appointment.doctor}</td>
                  <td>
                    <span className="muted small">
                      {new Intl.DateTimeFormat('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      }).format(new Date(appointment.scheduled_at))}
                    </span>
                  </td>
                  <td>
                    <StatusBadge status={appointment.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default AppointmentList;
