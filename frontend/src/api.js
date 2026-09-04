import axios from 'axios';

// Set REACT_APP_API_URL in your .env for production (e.g. https://yourdomain.com/api/projects)
const API_URL = process.env.REACT_APP_API_URL || 'http://13.60.174.101:5000/api/projects/';

export const getProjects = () => axios.get(API_URL);
export const createProject = (project) => axios.post(API_URL, project);
export const updateProject = (id, project) => axios.put(`${API_URL}/${id}`, project);
export const deleteProject = (id) => axios.delete(`${API_URL}/${id}`);
