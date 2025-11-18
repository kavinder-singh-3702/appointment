'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { createAppointment, fetchAppointments } from '../lib/api.js';

const DEFAULT_LIMIT = 25;

const createDefaultFilters = () => ({
  search: '',
  doctor: '',
  status: 'all',
  startDate: '',
  endDate: '',
});

const normalizeFilters = (filters = {}) => {
  const normalized = {};
  if (filters.search?.trim()) {
    normalized.search = filters.search.trim();
  }
  if (filters.doctor?.trim()) {
    normalized.doctor = filters.doctor.trim();
  }
  if (filters.status && filters.status !== 'all') {
    normalized.status = filters.status;
  }
  if (filters.startDate) {
    const start = new Date(filters.startDate);
    if (!Number.isNaN(start.getTime())) {
      normalized.start = start.toISOString();
    }
  }
  if (filters.endDate) {
    const end = new Date(filters.endDate);
    if (!Number.isNaN(end.getTime())) {
      end.setHours(23, 59, 59, 999);
      normalized.end = end.toISOString();
    }
  }
  return normalized;
};

export const useAppointments = ({ skip = 0, limit = DEFAULT_LIMIT } = {}) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [filters, setFilters] = useState(createDefaultFilters);

  const loadAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAppointments({ skip, limit, ...normalizeFilters(filters) });
      setAppointments(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters, skip, limit]);

  const addAppointment = useCallback(async (payload) => {
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      await createAppointment(payload);
      await loadAppointments();
      setSuccess('Appointment scheduled');
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setSubmitting(false);
    }
  }, [loadAppointments]);

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(createDefaultFilters());
  }, []);

  const upcomingAppointments = useMemo(() => {
    return [...appointments].sort(
      (a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()
    );
  }, [appointments]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  return {
    appointments: upcomingAppointments,
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
  };
};
