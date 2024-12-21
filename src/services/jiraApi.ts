import axios from 'axios';
import type { JiraUser, JiraIssue } from '../types/jira';
import { mockUser, mockIssue } from './mockData';

const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:3001/api/jira' : '/api/jira';

export const createJiraApi = (domain: string, email: string, apiToken: string) => {
  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'domain': domain,
      'email': email,
      'apitoken': apiToken // Note: Changed to match proxy server expectation
    },
    withCredentials: true
  });

  // Add response interceptor for better error handling
  api.interceptors.response.use(
    response => response,
    error => {
      console.error('API Error:', error.response?.data || error.message);
      return Promise.reject(error);
    }
  );

  return {
    verifyAccess: async (): Promise<JiraUser> => {
      if (import.meta.env.DEV) return mockUser;
      const { data } = await api.get('/myself');
      return data;
    },

    getIssue: async (issueKey: string): Promise<JiraIssue> => {
      if (import.meta.env.DEV) return mockIssue;
      const { data } = await api.get(`/issue/${issueKey}`);
      return data;
    },

    get: async (path: string) => {
      const { data } = await api.get(path);
      return data;
    },

    post: async (path: string, body: any) => {
      const { data } = await api.post(path, body);
      return data;
    },

    searchIssues: async (jql: string): Promise<any> => {
      if (import.meta.env.DEV) return { issues: [] };
      const { data } = await api.post('/search', { jql });
      return data;
    },
  };
};