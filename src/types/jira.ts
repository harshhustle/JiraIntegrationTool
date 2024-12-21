export interface JiraUser {
  accountId: string;
  displayName: string;
  emailAddress: string;
}

export interface JiraIssue {
  id: string;
  key: string;
  fields: {
    summary: string;
    description: string;
    status: {
      name: string;
    };
    priority: {
      name: string;
    };
    assignee: JiraUser;
    reporter: JiraUser;
    created: string;
    updated: string;
    parent?: {
      key: string;
      fields?: {
        summary: string;
      };
    };
  };
}