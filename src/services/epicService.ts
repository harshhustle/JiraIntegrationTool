import type { Epic } from '../types/epic';
import { createJiraApi } from './jiraApi';

export const epicService = {
  getProjectEpics: async (
    domain: string,
    email: string,
    apiToken: string,
    projectKey: string
  ): Promise<Epic[]> => {
    if (import.meta.env.DEV) {
      return [
        { id: '1', key: `${projectKey}-100`, summary: 'Security Epic Q1 2024', status: 'Open' },
        { id: '2', key: `${projectKey}-101`, summary: 'Security Epic Q2 2024', status: 'Open' },
        { id: '3', key: `${projectKey}-102`, summary: 'Security Epic Q3 2024', status: 'Open' },
      ];
    }

    const jiraApi = createJiraApi(domain, email, apiToken);
    const response = await jiraApi.searchIssues(
      `project = "${projectKey}" AND issuetype = Epic AND status != Done ORDER BY created DESC`
    );
    
    return response.issues.map((issue: any) => ({
      id: issue.id,
      key: issue.key,
      summary: issue.fields.summary,
      status: issue.fields.status.name,
    }));
  },
};