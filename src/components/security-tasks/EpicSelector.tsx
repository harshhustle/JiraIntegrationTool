import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Epic, EpicSelectorProps } from '../../types/epic';
import { epicService } from '../../services/epicService';

export const EpicSelector: React.FC<EpicSelectorProps> = ({
  domain,
  email,
  apiToken,
  projectKey,
  onEpicSelect,
  selectedEpicKey,
}) => {
  const [epics, setEpics] = useState<Epic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEpics = async () => {
      try {
        const data = await epicService.getProjectEpics(domain, email, apiToken, projectKey);
        setEpics(data);
      } catch (error) {
        console.error('Failed to load epics:', error);
      } finally {
        setLoading(false);
      }
    };

    if (projectKey) {
      loadEpics();
    }
  }, [domain, email, apiToken, projectKey]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Security Epic
      </label>
      <div className="relative">
        <select
          value={selectedEpicKey || ''}
          onChange={(e) => onEpicSelect(e.target.value)}
          className="appearance-none w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select an Epic</option>
          {epics.map((epic) => (
            <option key={epic.id} value={epic.key}>
              {epic.key} - {epic.summary}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
};