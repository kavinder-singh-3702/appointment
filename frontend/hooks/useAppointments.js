'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { createAppointment, fetchAppointments } from '../lib/api.js';

const DEFAULT_LIMIT = 25;

export const useAppointments = ({ skip = 0, limit = DEFAULT_LIMIT } = {}) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const loadAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAppointments({ skip, limit });
      setAppointments(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [skip, limit]);

  const addAppointment = useCallback(async (payload) => {
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      const created = await createAppointment(payload);
      setAppointments((prev) => [...prev, created]);
      setSuccess('Appointment scheduled');
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setSubmitting(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(null);
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
  };
};
