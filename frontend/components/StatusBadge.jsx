'use client';

const LABELS = {
  scheduled: 'Scheduled',
  checked_in: 'Checked In',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const StatusBadge = ({ status = 'scheduled' }) => {
  const normalized = status?.toLowerCase() || 'scheduled';
  return <span className={`status status-${normalized}`}>{LABELS[normalized] || normalized}</span>;
};

export default StatusBadge;
