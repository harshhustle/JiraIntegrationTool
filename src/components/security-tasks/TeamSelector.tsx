import React, { useEffect, useState } from 'react';
import { Users, ChevronDown } from 'lucide-react';
import type { Team, TeamSelectorProps } from '../../types/team';
import { teamService } from '../../services/teamService';

export const TeamSelector: React.FC<TeamSelectorProps> = ({
  domain,
  email,
  apiToken,
  onTeamSelect,
  selectedTeamId,
}) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const data = await teamService.getTeams(domain, email, apiToken);
        setTeams(data);
        
        // Select first team by default if none selected
        if (!selectedTeamId && data.length > 0) {
          onTeamSelect(data[0].id);
        }
      } catch (error) {
        console.error('Failed to load teams:', error);
        setError('Failed to load teams');
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, [domain, email, apiToken, onTeamSelect, selectedTeamId]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-sm">{error}</div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Security Team
      </label>
      <div className="relative">
        <select
          value={selectedTeamId || ''}
          onChange={(e) => onTeamSelect(e.target.value)}
          className="appearance-none w-full bg-white border border-gray-300 rounded-md py-2 pl-9 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a Team</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Users className="h-4 w-4 text-gray-400" />
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
};