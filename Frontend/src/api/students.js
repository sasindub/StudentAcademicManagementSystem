import api from './axios';

export const studentsAPI = {
  getAll: async (params = {}) => {
    const response = await api.get('/students', { params });
    return response.data;
  },
  
  getById: async (studentId) => {
    const response = await api.get(`/students/${studentId}`);
    return response.data;
  },
  
  getProfile: async (studentId) => {
    const response = await api.get(`/students/${studentId}/profile`);
    return response.data;
  },
  
  create: async (studentData) => {
    const response = await api.post('/students', studentData);
    return response.data;
  },
  
  update: async (studentId, studentData) => {
    const response = await api.put(`/students/${studentId}`, studentData);
    return response.data;
  },
  
  delete: async (studentId) => {
    const response = await api.delete(`/students/${studentId}`);
    return response.data;
  }
};

