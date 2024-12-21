import { createJiraApi } from './jiraApi';
import { JIRA_CUSTOM_FIELDS } from '../config/jiraFields';
import type { SecurityTask, SecurityTaskConfig } from '../types/security-tasks';

export const issueService = {
  createIssue: async (
    task: SecurityTask,
    config: SecurityTaskConfig,
    domain: string,
    email: string,
    apiToken: string,
    currentUser: { accountId: string }
  ) => {
    const jiraApi = createJiraApi(domain, email, apiToken);
    
    // Get story details with parent information
    const storyIssue = await jiraApi.getIssue(config.storyKey);
    const parentKey = storyIssue.fields.parent?.key || config.storyKey;
    
    // Format the summary
    const summary = `[${parentKey}][${config.storyKey}] ${task.title}`;
    
    // Get sprint ID from sprint name if sprint is provided
    let sprintId = null;
    if (task.sprint) {
      const sprints = await jiraApi.get(`/agile/1.0/board/${config.securityProjectKey}/sprint`);
      const sprint = sprints.values.find((s: any) => s.name === task.sprint);
      if (sprint) {
        sprintId = sprint.id;
      }
    }
    
    const issueData = {
      fields: {
        project: {
          id: config.securityProjectId
        },
        summary,
        description: task.description,
        issuetype: {
          name: 'Task'
        },
        parent: { key: parentKey },
        assignee: {
          id: currentUser.accountId
        },
        [JIRA_CUSTOM_FIELDS.TEAM_ID]: config.teamId,
        [JIRA_CUSTOM_FIELDS.SPRINT]: sprintId,
        [JIRA_CUSTOM_FIELDS.STORY_POINTS]: task.storyPoints,
      },
      update: {
        issuelinks: [
          {
            add: {
              type: {
                name: 'Relates',
                inward: 'relates to',
                outward: 'relates to'
              },
              outwardIssue: {
                key: config.storyKey
              }
            }
          },
          {
            add: {
              type: {
                name: 'Relates',
                inward: 'relates to',
                outward: 'relates to'
              },
              outwardIssue: {
                key: config.epicKey
              }
            }
          }
        ]
      }
    };

    const response = await jiraApi.post('/issue', issueData);
    return response;
  }
};