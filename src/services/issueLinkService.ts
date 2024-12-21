import { createJiraApi } from './jiraApi';

export const issueLinkService = {
  createIssueLinks: async (
    createdIssueKey: string,
    storyKey: string,
    epicKey: string | undefined,
    domain: string,
    email: string,
    apiToken: string
  ) => {
    const jiraApi = createJiraApi(domain, email, apiToken);

    const linkData = {
      type: {
        name: 'Relates',
        inward: 'relates to',
        outward: 'relates to'
      },
      inwardIssue: {
        key: createdIssueKey
      },
      outwardIssue: {
        key: storyKey
      }
    };

    // Create link to story
    await jiraApi.post('/issueLink', linkData);

    // Create link to epic if provided
    if (epicKey) {
      const epicLinkData = {
        ...linkData,
        outwardIssue: {
          key: epicKey
        }
      };
      await jiraApi.post('/issueLink', epicLinkData);
    }
  }
};