import React, { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import type { SecurityTaskConfig, SecurityTask, CreatedTask } from '../../types/security-tasks';
import type { TaskData } from '../../types/task-data';
import { SECURITY_TASK_TYPES } from '../../types/security-tasks';
import { securityTaskService } from '../../services/securityTasks';
import { sprintService } from '../../services/sprintService';
import { TaskRow } from './TaskRow';

interface Props {
  config: SecurityTaskConfig;
  domain: string;
  email: string;
  apiToken: string;
  onTaskCreated: (task: CreatedTask) => void;
}

const getTaskDescription = (type: SecurityTask['type'], storyKey: string): string => {
  const baseDescription = `Security review task for story ${storyKey}.\n\n`;
  
  switch (type) {
    case 'Design':
      return `${baseDescription}Perform design and architecture review to identify security flaws in the proposed solution.`;
    case 'SAST':
      return `${baseDescription}Analyze static code analysis reports and perform security code review to identify vulnerabilities.`;
    case 'DAST':
      return `${baseDescription}Review dynamic application security testing results and validate findings.`;
    case 'Opensource':
      return `${baseDescription}Analyze dependencies for known vulnerabilities and review security advisories.`;
    case 'Pentest':
      return `${baseDescription}Conduct manual penetration testing to identify security vulnerabilities.`;
    default:
      return baseDescription;
  }
};

export const TaskPreviewTable: React.FC<Props> = ({
  config,
  domain,
  email,
  apiToken,
  onTaskCreated,
}) => {
  const [creatingTask, setCreatingTask] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [createdTasks, setCreatedTasks] = useState<Record<string, CreatedTask>>({});
  const [sprints, setSprints] = useState<Array<{ id: string; name: string }>>([]);
  const [taskData, setTaskData] = useState<Record<string, TaskData>>(() => {
    return Object.keys(SECURITY_TASK_TYPES).reduce((acc, type) => ({
      ...acc,
      [type]: {
        title: SECURITY_TASK_TYPES[type as keyof typeof SECURITY_TASK_TYPES],
        description: getTaskDescription(type as SecurityTask['type'], config.storyKey),
        storyPoints: config.defaultStoryPoints || 3,
        sprint: config.sprint || '',
      },
    }), {});
  });

  useEffect(() => {
    const loadSprints = async () => {
      try {
        const data = await sprintService.getProjectSprints(
          domain,
          email,
          apiToken,
          config.securityProjectKey
        );
        setSprints(data);
      } catch (err) {
        console.error('Failed to load sprints:', err);
        setError('Failed to load sprints. Please try again.');
      }
    };

    if (config.securityProjectKey) {
      loadSprints();
    }
  }, [domain, email, apiToken, config.securityProjectKey]);

  const handleCreateTask = async (type: SecurityTask['type']) => {
    if (creatingTask) return;
    
    setError(null);
    setCreatingTask(type);
    
    try {
      const data = taskData[type];
      const task: SecurityTask = {
        type,
        title: data.title,
        description: data.description,
        storyPoints: data.storyPoints,
        sprint: data.sprint,
      };

      const createdTask = await securityTaskService.createSecurityTask(
        task,
        config,
        domain,
        email,
        apiToken
      );
      
      setCreatedTasks(prev => ({ ...prev, [type]: createdTask }));
      onTaskCreated(createdTask);
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.error('Failed to create task:', err);
    } finally {
      setCreatingTask(null);
    }
  };

  const updateTaskData = (type: string, field: keyof TaskData, value: string | number) => {
    setTaskData(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Points
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sprint
            </th>
            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {(Object.keys(SECURITY_TASK_TYPES) as Array<SecurityTask['type']>).map((type) => (
            <TaskRow
              key={type}
              type={type}
              data={taskData[type]}
              createdTask={createdTasks[type] || null}
              creatingTask={creatingTask}
              sprints={sprints}
              onUpdateData={(field, value) => updateTaskData(type, field, value)}
              onCreateTask={() => handleCreateTask(type)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};