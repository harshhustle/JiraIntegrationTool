import React, { useState } from 'react';
import type { SecurityTaskConfig } from '../../types/security-tasks';
import { SprintSelector } from './SprintSelector';
import { TeamSelector } from './TeamSelector';
import { EpicSelector } from './EpicSelector';
import Button from '../Button';

interface Props {
  config: Partial<SecurityTaskConfig>;
  domain: string;
  email: string;
  apiToken: string;
  onSubmit: (config: SecurityTaskConfig) => void;
}

export const TaskConfigurationForm: React.FC<Props> = ({
  config,
  domain,
  email,
  apiToken,
  onSubmit,
}) => {
  const [sprint, setSprint] = useState('');
  const [storyPoints, setStoryPoints] = useState<number>(3);
  const [teamId, setTeamId] = useState<string>('');
  const [epicKey, setEpicKey] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!config.securityProjectId || !config.securityProjectKey || !config.storyKey || !teamId || !epicKey) {
      return;
    }

    onSubmit({
      securityProjectId: config.securityProjectId,
      securityProjectKey: config.securityProjectKey,
      storyKey: config.storyKey,
      epicKey,
      sprint,
      defaultStoryPoints: storyPoints,
      teamId,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {config.securityProjectKey && (
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-2">
            <TeamSelector
              domain={domain}
              email={email}
              apiToken={apiToken}
              onTeamSelect={setTeamId}
              selectedTeamId={teamId}
            />
          </div>
          <div className="col-span-2">
            <EpicSelector
              domain={domain}
              email={email}
              apiToken={apiToken}
              projectKey={config.securityProjectKey}
              onEpicSelect={setEpicKey}
              selectedEpicKey={epicKey}
            />
          </div>
          <div className="col-span-2">
            <SprintSelector
              domain={domain}
              email={email}
              apiToken={apiToken}
              projectKey={config.securityProjectKey}
              onSprintSelect={setSprint}
              selectedSprint={sprint}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Story Points
            </label>
            <input
              type="number"
              value={storyPoints}
              onChange={(e) => setStoryPoints(Number(e.target.value))}
              min={0}
              max={13}
              className="w-full rounded-md border border-gray-300 py-1.5 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          variant="primary"
          disabled={!config.securityProjectId || !config.storyKey || !teamId || !epicKey}
        >
          Preview Tasks
        </Button>
      </div>
    </form>
  );
};