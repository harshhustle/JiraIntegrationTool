export interface Epic {
  id: string;
  key: string;
  summary: string;
  status: string;
}

export interface EpicSelectorProps {
  domain: string;
  email: string;
  apiToken: string;
  projectKey: string;
  onEpicSelect: (epicKey: string) => void;
  selectedEpicKey?: string;
}