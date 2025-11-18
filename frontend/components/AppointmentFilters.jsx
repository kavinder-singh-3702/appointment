'use client';

const STATUSES = [
  { value: 'all', label: 'All' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'checked_in', label: 'Checked In' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const AppointmentFilters = ({ filters, onChange, onReset, doctorOptions = [], loading = false }) => {
  const doctorList = Array.from(new Set(doctorOptions.filter(Boolean)));

  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange(name, value);
  };

  return (
    <section className="card filters">
      <div className="filters-header">
        <div>
          <h2>Filters</h2>
          <p className="muted small">Narrow appointments by patient, doctor, status, or date window.</p>
        </div>
        <button type="button" className="ghost" onClick={onReset}>
          Clear
        </button>
      </div>

      <div className="filters-grid">
        <label>
          Search patient
          <input
            type="text"
            name="search"
            value={filters.search}
            placeholder="e.g. Jane"
            onChange={handleChange}
          />
        </label>

        <label>
          Doctor
          <select name="doctor" value={filters.doctor} onChange={handleChange} disabled={loading}>
            <option value="">{loading ? 'Loading...' : 'All doctors'}</option>
            {doctorList.map((doctorName) => (
              <option key={doctorName} value={doctorName}>
                {doctorName}
              </option>
            ))}
          </select>
        </label>

        <label>
          Status
          <select name="status" value={filters.status} onChange={handleChange}>
            {STATUSES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Start date
          <input type="date" name="startDate" value={filters.startDate} onChange={handleChange} />
        </label>

        <label>
          End date
          <input type="date" name="endDate" value={filters.endDate} onChange={handleChange} />
        </label>
      </div>
    </section>
  );
};

export default AppointmentFilters;
