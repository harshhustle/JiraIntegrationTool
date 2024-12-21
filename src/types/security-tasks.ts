export interface SecurityTask {
  title: string;
  type: 'Design' | 'SAST' | 'DAST' | 'Opensource' | 'Pentest';
  description: string;
  storyPoints?: number;
  sprint?: string;
  assignee?: JiraUser;
}

export interface SecurityTaskConfig {
  securityProjectId: string;
  securityProjectKey: string;
  storyKey: string;
  epicKey: string; // Required epic key
  sprint?: string;
  defaultStoryPoints?: number;
  teamId?: string;
}

export interface CreatedTask {
  issueKey: string;
  issueUrl: string;
  type: SecurityTask['type'];
  title: string;
}

export const SECURITY_TASK_TYPES = {
  Design: 'Design & Architecture review',
  SAST: 'SAST report analysis & Tirage and Code review',
  DAST: 'DAST report analysis & Triage',
  Opensource: 'Opensource Vulnerability report analysis & Triage',
  Pentest: 'Manual Pentest',
} as const;