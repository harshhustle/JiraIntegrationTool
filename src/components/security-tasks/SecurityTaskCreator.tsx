import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import type { SecurityTaskConfig, CreatedTask } from '../../types/security-tasks';
import { ProjectSelector } from './ProjectSelector';
import { StoryKeyInput } from './StoryKeyInput';
import { TaskConfigurationForm } from './TaskConfigurationForm';
import { TaskPreviewTable } from './TaskPreviewTable';
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
}

const SecurityTaskCreator: React.FC<Props> = ({ domain, email, apiToken }) => {
  const [config, setConfig] = useState<Partial<SecurityTaskConfig>>({});
  const [showPreview, setShowPreview] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setConfig(prev => ({
      ...prev,
      securityProjectId: project.id,
      securityProjectKey: project.key,
    }));
  };

  const handleConfigSubmit = (newConfig: SecurityTaskConfig) => {
    setConfig(newConfig);
    setShowPreview(true);
  };

  const handleStartOver = () => {
    setShowPreview(false);
    setConfig(prev => ({
      securityProjectId: prev.securityProjectId,
      securityProjectKey: prev.securityProjectKey,
    }));
  };

  const handleTaskCreated = (task: CreatedTask) => {
    // Handle task creation if needed
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-blue-600 mb-6">
        <Shield className="h-6 w-6" />
        <h2 className="text-xl font-semibold">Create Security Review Tasks</h2>
      </div>

      {/* Configuration Form - Always visible */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-6">
          <ProjectSelector
            domain={domain}
            email={email}
            apiToken={apiToken}
            selectedProject={selectedProject}
            onProjectSelect={handleProjectSelect}
          />
          <StoryKeyInput
            domain={domain}
            email={email}
            apiToken={apiToken}
            onValidStory={(storyKey) => setConfig(prev => ({ ...prev, storyKey }))}
          />
          {!showPreview && (
            <TaskConfigurationForm
              config={config}
              domain={domain}
              email={email}
              apiToken={apiToken}
              onSubmit={handleConfigSubmit}
            />
          )}
        </div>
      </div>

      {/* Preview Tasks - Show below when available */}
      {showPreview && config.securityProjectKey && config.storyKey && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Task Preview</h3>
            <Button
              onClick={handleStartOver}
              variant="outline"
              size="sm"
            >
              Start Over
            </Button>
          </div>
          <TaskPreviewTable
            config={config as SecurityTaskConfig}
            domain={domain}
            email={email}
            apiToken={apiToken}
            onTaskCreated={handleTaskCreated}
          />
        </div>
      )}
    </div>
  );
};

export default SecurityTaskCreator;