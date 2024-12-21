export interface TaskData {
  title: string;
  description: string;
  storyPoints: number;
  sprint: string;
}

export interface TaskTableProps {
  domain: string;
  email: string;
  apiToken: string;
  projectKey: string;
}