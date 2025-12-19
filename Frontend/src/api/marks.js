import api from './axios';

export const marksAPI = {
  getAll: async (params = {}) => {
    const response = await api.get('/marks', { params });
    return response.data;
  },
  
  getByStudent: async (studentId, params = {}) => {
    const response = await api.get(`/marks/student/${studentId}`, { params });
    return response.data;
  },
  
  getById: async (marksId) => {
    const response = await api.get(`/marks/${marksId}`);
    return response.data;
  },
  
  getSummary: async () => {
    const response = await api.get('/marks/stats/summary');
    return response.data;
  },
  
  create: async (marksData) => {
    const response = await api.post('/marks', marksData);
    return response.data;
  },
  
  update: async (marksId, marksData) => {
    const response = await api.put(`/marks/${marksId}`, marksData);
    return response.data;
  },
  
  delete: async (marksId) => {
    const response = await api.delete(`/marks/${marksId}`);
    return response.data;
  },
  
  deleteSubject: async (marksId, subjectName) => {
    const response = await api.delete(`/marks/${marksId}/subject/${subjectName}`);
    return response.data;
  }
};


