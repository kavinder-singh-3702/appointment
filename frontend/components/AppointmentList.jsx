'use client';

import StatusBadge from './StatusBadge.jsx';

const AppointmentList = ({ appointments = [], loading, onRefresh }) => {
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
