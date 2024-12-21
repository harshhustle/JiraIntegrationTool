import { createJiraApi } from './jiraApi';
import type { Team } from '../types/team';

export const teamService = {
  getTeams: async (
    domain: string,
    email: string,
    apiToken: string
  ): Promise<Team[]> => {
    if (import.meta.env.DEV) {
      return [
        { id: 'team-1', name: 'Security Team Alpha' },
        { id: 'team-2', name: 'Security Team Beta' },
        { id: 'team-3', name: 'Security Team Gamma' },
      ];
    }

    const jiraApi = createJiraApi(domain, email, apiToken);
    const response = await jiraApi.get('/team');
    
    return response.values.map((team: any) => ({
      id: team.id,
      name: team.name,
    }));
  },
};