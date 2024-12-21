import { isDevelopment } from '../config/environment';
import { createJiraApi } from './jiraApi';
import { issueService } from './issueService';
import { issueLinkService } from './issueLinkService';
import type { SecurityTask, SecurityTaskConfig, CreatedTask } from '../types/security-tasks';

const MOCK_DELAY = 500;

const mockResponse = async <T>(data: T): Promise<T> => {
  if (isDevelopment) {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  }
  return data;
};

export const securityTaskService = {
  validateStoryKey: async (
    storyKey: string,
    domain: string,
    email: string,
    apiToken: string
  ): Promise<boolean> => {
    if (isDevelopment) {
      return mockResponse(true);
    }

    try {
      const jiraApi = createJiraApi(domain, email, apiToken);
      await jiraApi.getIssue(storyKey);
      return true;
    } catch {
      return false;
    }
  },

  createSecurityTask: async (
    task: SecurityTask,
    config: SecurityTaskConfig,
    domain: string,
    email: string,
    apiToken: string
  ): Promise<CreatedTask> => {
    if (isDevelopment) {
      const mockTask = {
        issueKey: `${config.securityProjectKey}-${Math.floor(Math.random() * 1000)}`,
        issueUrl: `https://${domain}.atlassian.net/browse/${config.securityProjectKey}-123`,
        type: task.type,
        title: task.title,
      };
      return mockResponse(mockTask);
    }

    // Get current user info
    const jiraApi = createJiraApi(domain, email, apiToken);
    const currentUser = await jiraApi.verifyAccess();

    // Create the issue
    const response = await issueService.createIssue(
      task,
      config,
      domain,
      email,
      apiToken,
      currentUser
    );
    
    const createdIssueKey = response.key;
    
    return {
      issueKey: createdIssueKey,
      issueUrl: `https://${domain}.atlassian.net/browse/${createdIssueKey}`,
      type: task.type,
      title: task.title,
    };
  },

  getSecurityProjects: async (
    domain: string,
    email: string,
    apiToken: string
  ) => {
    if (isDevelopment) {
      const mockProjects = [
        { id: 'PSECDNA', key: 'PSECDNA', name: 'Product Security DNA' },
        { id: 'SECREV', key: 'SECREV', name: 'Security Review' },
      ];
      return mockResponse(mockProjects);
    }

    const jiraApi = createJiraApi(domain, email, apiToken);
    const response = await jiraApi.get('/project');
    
    return response.map((project: any) => ({
      id: project.id,
      key: project.key,
      name: project.name,
    }));
  },
};