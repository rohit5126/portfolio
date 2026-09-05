import axios from 'axios';

// Set REACT_APP_API_URL in your .env for production (e.g. https://yourdomain.com/api/projects)
const PROJECTS_URL = process.env.REACT_APP_API_URL || 'http://16.171.253.89:5000/api/projects/';
const API_ROOT = PROJECTS_URL.replace(/\/api\/projects\/?$/, '/api');

const SKILLS_URL = `${API_ROOT}/skills`;
const EXPERIENCE_URL = `${API_ROOT}/experience`;
const STATS_URL = `${API_ROOT}/stats`;

export const getProjects = () => axios.get(PROJECTS_URL);
export const createProject = (project) => axios.post(PROJECTS_URL, project);
export const updateProject = (id, project) => axios.put(`${PROJECTS_URL}/${id}`, project);
export const deleteProject = (id) => axios.delete(`${PROJECTS_URL}/${id}`);

export const getSkills = () => axios.get(SKILLS_URL);
export const getExperience = () => axios.get(EXPERIENCE_URL);
export const getStats = () => axios.get(STATS_URL);
export const logVisit = () =>
  axios.post(`${STATS_URL}/visit`, { page: window.location.pathname }).catch(() => {});
