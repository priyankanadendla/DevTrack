import api from './axios';

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getActivities: (limit = 10) => api.get(`/dashboard/activities?limit=${limit}`),
  getCalendar: (days = 365) => api.get(`/dashboard/calendar?days=${days}`),
};

export const jobsAPI = {
  getAll: (params) => api.get('/jobs', { params }),
  getById: (id) => api.get(`/jobs/${id}`),
  create: (data) => api.post('/jobs', data),
  update: (id, data) => api.put(`/jobs/${id}`, data),
  delete: (id) => api.delete(`/jobs/${id}`),
};

export const codingAPI = {
  getAll: (params) => api.get('/coding', { params }),
  getById: (id) => api.get(`/coding/${id}`),
  create: (data) => api.post('/coding', data),
  update: (id, data) => api.put(`/coding/${id}`, data),
  delete: (id) => api.delete(`/coding/${id}`),
};

export const skillsAPI = {
  getAll: () => api.get('/skills'),
  getById: (id) => api.get(`/skills/${id}`),
  create: (data) => api.post('/skills', data),
  update: (id, data) => api.put(`/skills/${id}`, data),
  delete: (id) => api.delete(`/skills/${id}`),
};

export const projectsAPI = {
  getAll: (params) => api.get('/projects', { params }),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
};

export const goalsAPI = {
  getAll: () => api.get('/goals'),
  getByDate: (date) => api.get(`/goals/date/${date}`),
  getById: (id) => api.get(`/goals/${id}`),
  create: (data) => api.post('/goals', data),
  update: (id, data) => api.put(`/goals/${id}`, data),
  toggle: (id) => api.patch(`/goals/${id}/toggle`),
  delete: (id) => api.delete(`/goals/${id}`),
};
