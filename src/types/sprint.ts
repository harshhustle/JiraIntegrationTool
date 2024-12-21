export interface Sprint {
  id: string;
  name: string;
  state: 'active' | 'future';
  startDate: string;
  endDate: string;
}

export interface SprintSelectorProps {
  domain: string;
  email: string;
  apiToken: string;
  projectKey: string;
  onSprintSelect: (sprintName: string) => void;
  selectedSprint?: string;
}