import type { Sprint } from '../types/sprint';
import { createJiraApi } from './jiraApi';

export const sprintService = {
  getProjectSprints: async (
    domain: string,
    email: string,
    apiToken: string,
    projectKey: string
  ): Promise<Sprint[]> => {
    if (import.meta.env.DEV) {
      const now = new Date();
      const twoWeeksFromNow = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
      
      return [
        {
          id: '1',
          name: 'Current Sprint',
          state: 'active',
          startDate: now.toISOString(),
          endDate: twoWeeksFromNow.toISOString(),
        },
      ];
    }

    const jiraApi = createJiraApi(domain, email, apiToken);
    const response = await jiraApi.get(`/agile/1.0/board/${projectKey}/sprint`);
    
    return response.values.map((sprint: any) => ({
      id: sprint.id,
      name: sprint.name,
      state: sprint.state,
      startDate: sprint.startDate,
      endDate: sprint.endDate,
    }));
  },
};