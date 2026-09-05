import axios from 'axios';

// Relative path — browser sends this to nginx, nginx proxies to the backend container
const PROJECTS_URL = '/api/projects/';
const API_ROOT = '/api';

const SKILLS_URL = `${API_ROOT}/skills/`;
const EXPERIENCE_URL = `${API_ROOT}/experience/`;
const STATS_URL = `${API_ROOT}/stats/`;

export const getProjects = () => axios.get(PROJECTS_URL);
export const createProject = (project) => axios.post(PROJECTS_URL, project);
export const updateProject = (id, project) => axios.put(`${PROJECTS_URL}/${id}`, project);
export const deleteProject = (id) => axios.delete(`${PROJECTS_URL}/${id}`);

export const getSkills = () => axios.get(SKILLS_URL);
export const getExperience = () => axios.get(EXPERIENCE_URL);
export const getStats = () => axios.get(STATS_URL);
export const logVisit = () =>
  axios.post(`${STATS_URL}/visit`, { page: window.location.pathname }).catch(() => {});