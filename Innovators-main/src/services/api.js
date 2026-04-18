import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// AUTH
export const register = (data) => API.post('/auth/register', data);
export const login    = (data) => API.post('/auth/login', data);

// USERS
export const getMe       = ()     => API.get('/users/me');
export const updateMe    = (data) => API.put('/users/me', data);
export const getStudents = ()     => API.get('/users');

// INTERNSHIPS
export const getInternships   = (params)   => API.get('/internships', { params });
export const getInternship    = (id)       => API.get(`/internships/${id}`);
export const createInternship = (data)     => API.post('/internships', data);
export const updateInternship = (id, data) => API.put(`/internships/${id}`, data);
export const deleteInternship = (id)       => API.delete(`/internships/${id}`);

// APPLICATIONS
export const getApplications   = ()              => API.get('/applications');
export const applyToInternship = (data)          => API.post('/applications', data);
export const updateAppStatus   = (id, status)    => API.put(`/applications/${id}/status`, { status });

// REPORTS
export const getReports         = ()                    => API.get('/reports');
export const getReport          = (id)                  => API.get(`/reports/${id}`);
export const createReport       = (data)                => API.post('/reports', data);
export const updateReport       = (id, data)            => API.put(`/reports/${id}`, data);
export const updateReportStatus = (id, status, comments) => API.put(`/reports/${id}/status`, { status, supervisorComments: comments });
export const appealReport       = (id, message)         => API.post(`/reports/${id}/appeal`, { message });
export const deleteReport       = (id)                  => API.delete(`/reports/${id}`);

// COMPANIES
export const getCompanies        = (params)        => API.get('/companies', { params });
export const updateCompanyStatus = (id, status)    => API.put(`/companies/${id}/status`, { status });

// WORKSHOPS
export const getWorkshops        = ()         => API.get('/workshops');
export const createWorkshop      = (data)     => API.post('/workshops', data);
export const updateWorkshop      = (id, data) => API.put(`/workshops/${id}`, data);
export const deleteWorkshop      = (id)       => API.delete(`/workshops/${id}`);
export const registerForWorkshop = (id)       => API.post(`/workshops/${id}/register`);
export const completeWorkshop    = (id)       => API.put(`/workshops/${id}/complete`);

// EVALUATIONS
export const getEvaluations   = ()         => API.get('/evaluations');
export const createEvaluation = (data)     => API.post('/evaluations', data);
export const updateEvaluation = (id, data) => API.put(`/evaluations/${id}`, data);

// NOTIFICATIONS
export const getNotifications = ()   => API.get('/notifications');
export const markAsRead       = (id) => API.put(`/notifications/${id}/read`);

export default API;
