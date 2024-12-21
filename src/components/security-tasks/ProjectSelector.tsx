import React, { useEffect, useState } from 'react';
import { Edit2, ChevronDown } from 'lucide-react';
import { securityTaskService } from '../../services/securityTasks';
import Button from '../Button';

interface Project {
  id: string;
  key: string;
  name: string;
}

interface Props {
  domain: string;
  email: string;
  apiToken: string;
  selectedProject: Project | null;
  onProjectSelect: (project: Project) => void;
}

export const ProjectSelector: React.FC<Props> = ({
  domain,
  email,
  apiToken,
  selectedProject,
  onProjectSelect,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await securityTaskService.getSecurityProjects(domain, email, apiToken);
        setProjects(data);
        
        // Find and set the default project (PSECDNA) only if no project is selected
        if (!selectedProject) {
          const defaultProject = data.find(p => p.key === 'PSECDNA');
          if (defaultProject) {
            onProjectSelect(defaultProject);
          }
        }
      } catch (error) {
        console.error('Failed to load security projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [domain, email, apiToken, onProjectSelect, selectedProject]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    );
  }

  const handleProjectSelect = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      onProjectSelect(project);
      setIsEditing(false);
    }
  };

  if (!isEditing && selectedProject) {
    return (
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Security Project
        </label>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <span className="font-mono text-sm text-gray-600 mr-2">
              {selectedProject.key}
            </span>
            <span className="text-gray-900">{selectedProject.name}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Change Project
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Select Security Project
      </label>
      <div className="relative">
        <select
          value={selectedProject?.id || ''}
          onChange={(e) => handleProjectSelect(e.target.value)}
          className="appearance-none w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.key} - {project.name}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      </div>
      {isEditing && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};