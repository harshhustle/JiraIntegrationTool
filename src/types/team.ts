export interface Team {
  id: string;
  name: string;
}

export interface TeamSelectorProps {
  domain: string;
  email: string;
  apiToken: string;
  onTeamSelect: (teamId: string) => void;
  selectedTeamId?: string;
}