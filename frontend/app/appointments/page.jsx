'use client';

import { useEffect, useState } from 'react';
import AppointmentFilters from '../../components/AppointmentFilters.jsx';
import AppointmentForm from '../../components/AppointmentForm.jsx';
import AppointmentList from '../../components/AppointmentList.jsx';
import Modal from '../../components/ui/Modal.jsx';
import { useAppointments } from '../../hooks/useAppointments.js';
import { fetchDoctors } from '../../lib/api.js';

export default function AppointmentsPage() {
  const {
    appointments,
    loading,
    submitting,
    error,
    success,
    loadAppointments,
    addAppointment,
    clearMessages,
    filters,
    setFilters,
    resetFilters,
  } = useAppointments();
  const [modalOpen, setModalOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [doctorError, setDoctorError] = useState(null);
  const [doctorLoading, setDoctorLoading] = useState(false);

  useEffect(() => {
    let active = true;
    const loadDoctors = async () => {
      setDoctorLoading(true);
      try {
        const list = await fetchDoctors();
        if (active) {
          setDoctors(Array.isArray(list) ? list : []);
          setDoctorError(null);
        }
      } catch (err) {
        if (active) {
          setDoctorError(err.message);
        }
      } finally {
        if (active) {
          setDoctorLoading(false);
        }
      }
    };

    loadDoctors();
    return () => {
      active = false;
    };
  }, []);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="page">
      <AppointmentFilters
        filters={filters}
        onChange={handleFilterChange}
        onReset={resetFilters}
        doctorOptions={doctors}
        loading={doctorLoading}
      />
      {error && <p className="alert error global-alert">{error}</p>}
      {doctorError && <p className="alert error global-alert">{doctorError}</p>}
      {success && <p className="alert success global-alert">{success}</p>}
      <AppointmentList
        appointments={appointments}
        loading={loading}
        onRefresh={loadAppointments}
        onCreate={() => setModalOpen(true)}
      />

      <Modal
        title="Create appointment"
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          clearMessages();
        }}
      >
        <AppointmentForm
          onSubmit={addAppointment}
          submitting={submitting}
          error={error}
          clearMessages={clearMessages}
          onSuccess={() => {
            setModalOpen(false);
            loadAppointments();
          }}
        />
      </Modal>
    </main>
  );
}
