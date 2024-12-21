export const mockUser = {
  accountId: "mock-user-id",
  displayName: "Test User",
  emailAddress: "test@example.com"
};

export const mockIssue = {
  id: "10052",
  key: "PROJ-123",
  fields: {
    summary: "Implement new authentication flow",
    description: "We need to implement OAuth 2.0 authentication flow for better security.",
    status: {
      name: "In Progress"
    },
    priority: {
      name: "High"
    },
    assignee: {
      accountId: "mock-user-id",
      displayName: "Test User",
      emailAddress: "test@example.com"
    },
    reporter: {
      accountId: "mock-user-id",
      displayName: "Test User",
      emailAddress: "test@example.com"
    },
    created: "2024-02-20T08:30:00.000Z",
    updated: "2024-02-21T15:45:00.000Z"
  }
};

// Mock authentication data for development
export const mockAuthData = {
  domain: "example",
  email: "test@example.com",
  apiToken: "mock-api-token"
};