import { useState, useCallback } from 'react';
import { marksAPI } from '../api';
import toast from 'react-hot-toast';

export const useMarks = () => {
  const [marks, setMarks] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMarks = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await marksAPI.getAll(params);
      setMarks(data);
      return data;
    } catch (err) {
      const message = err.response?.data?.detail || 'Failed to fetch marks';
      setError(message);
      toast.error(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStudentMarks = useCallback(async (studentId, params = {}) => {
    setLoading(true);
    try {
      const data = await marksAPI.getByStudent(studentId, params);
      return data;
    } catch (err) {
      const message = err.response?.data?.detail || 'Failed to fetch student marks';
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSummary = useCallback(async () => {
    try {
      const data = await marksAPI.getSummary();
      setSummary(data);
      return data;
    } catch (err) {
      const message = err.response?.data?.detail || 'Failed to fetch summary';
      toast.error(message);
      throw err;
    }
  }, []);

  const createMarks = useCallback(async (marksData) => {
    try {
      const newMarks = await marksAPI.create(marksData);
      setMarks(prev => [...prev, newMarks]);
      toast.success('Marks added successfully!');
      return newMarks;
    } catch (err) {
      const message = err.response?.data?.detail || 'Failed to add marks';
      toast.error(message);
      throw err;
    }
  }, []);

  const updateMarks = useCallback(async (marksId, marksData) => {
    try {
      const updated = await marksAPI.update(marksId, marksData);
      setMarks(prev => prev.map(m => m.id === marksId ? updated : m));
      toast.success('Marks updated successfully!');
      return updated;
    } catch (err) {
      const message = err.response?.data?.detail || 'Failed to update marks';
      toast.error(message);
      throw err;
    }
  }, []);

  const deleteMarks = useCallback(async (marksId) => {
    try {
      await marksAPI.delete(marksId);
      setMarks(prev => prev.filter(m => m.id !== marksId));
      toast.success('Marks deleted successfully!');
    } catch (err) {
      const message = err.response?.data?.detail || 'Failed to delete marks';
      toast.error(message);
      throw err;
    }
  }, []);

  return {
    marks,
    summary,
    loading,
    error,
    fetchMarks,
    fetchStudentMarks,
    fetchSummary,
    createMarks,
    updateMarks,
    deleteMarks
  };
};

