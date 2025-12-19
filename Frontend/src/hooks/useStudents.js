import { useState, useCallback } from 'react';
import { studentsAPI } from '../api';
import toast from 'react-hot-toast';

export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStudents = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await studentsAPI.getAll(params);
      setStudents(data);
      return data;
    } catch (err) {
      const message = err.response?.data?.detail || 'Failed to fetch students';
      setError(message);
      toast.error(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getStudent = useCallback(async (studentId) => {
    try {
      return await studentsAPI.getById(studentId);
    } catch (err) {
      const message = err.response?.data?.detail || 'Failed to fetch student';
      toast.error(message);
      throw err;
    }
  }, []);

  const getStudentProfile = useCallback(async (studentId) => {
    try {
      return await studentsAPI.getProfile(studentId);
    } catch (err) {
      const message = err.response?.data?.detail || 'Failed to fetch student profile';
      toast.error(message);
      throw err;
    }
  }, []);

  const createStudent = useCallback(async (studentData) => {
    try {
      const newStudent = await studentsAPI.create(studentData);
      setStudents(prev => [...prev, newStudent]);
      toast.success('Student created successfully!');
      return newStudent;
    } catch (err) {
      const message = err.response?.data?.detail || 'Failed to create student';
      toast.error(message);
      throw err;
    }
  }, []);

  const updateStudent = useCallback(async (studentId, studentData) => {
    try {
      const updated = await studentsAPI.update(studentId, studentData);
      setStudents(prev => prev.map(s => s.studentId === studentId ? updated : s));
      toast.success('Student updated successfully!');
      return updated;
    } catch (err) {
      const message = err.response?.data?.detail || 'Failed to update student';
      toast.error(message);
      throw err;
    }
  }, []);

  const deleteStudent = useCallback(async (studentId) => {
    try {
      await studentsAPI.delete(studentId);
      setStudents(prev => prev.filter(s => s.studentId !== studentId));
      toast.success('Student deleted successfully!');
    } catch (err) {
      const message = err.response?.data?.detail || 'Failed to delete student';
      toast.error(message);
      throw err;
    }
  }, []);

  return {
    students,
    loading,
    error,
    fetchStudents,
    getStudent,
    getStudentProfile,
    createStudent,
    updateStudent,
    deleteStudent
  };
};


