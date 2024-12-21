import React, { useEffect, useState } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import type { Sprint, SprintSelectorProps } from '../../types/sprint';
import { sprintService } from '../../services/sprintService';

export const SprintSelector: React.FC<SprintSelectorProps> = ({
  domain,
  email,
  apiToken,
  projectKey,
  onSprintSelect,
  selectedSprint,
}) => {
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSprints = async () => {
      try {
        const data = await sprintService.getProjectSprints(domain, email, apiToken, projectKey);
        setSprints(data);
        
        // If there's an active sprint and no selection, select it by default
        if (!selectedSprint) {
          const activeSprint = data.find(s => s.state === 'active');
          if (activeSprint) {
            onSprintSelect(activeSprint.name);
          }
        }
      } catch (error) {
        console.error('Failed to load sprints:', error);
      } finally {
        setLoading(false);
      }
    };

    if (projectKey) {
      loadSprints();
    }
  }, [domain, email, apiToken, projectKey, onSprintSelect, selectedSprint]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Sprint
      </label>
      <div className="relative">
        <select
          value={selectedSprint || ''}
          onChange={(e) => onSprintSelect(e.target.value)}
          className="appearance-none w-full bg-white border border-gray-300 rounded-md py-2 pl-9 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a Sprint</option>
          {sprints.map((sprint) => (
            <option key={sprint.id} value={sprint.name}>
              {sprint.name} ({formatDate(sprint.startDate)} - {formatDate(sprint.endDate)})
              {sprint.state === 'active' ? ' (Active)' : ''}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Calendar className="h-4 w-4 text-gray-400" />
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
};