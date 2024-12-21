import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { CreatedTask } from '../../types/security-tasks';

interface Props {
  tasks: CreatedTask[];
  domain: string;
}

export const CreatedTasksList: React.FC<Props> = ({ tasks, domain }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Created Tasks</h3>
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.issueKey}
              className="flex items-center justify-between py-2 px-4 bg-white rounded-md shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <span className="font-mono text-sm text-gray-600">
                  {task.issueKey}
                </span>
                <span className="text-gray-900">{task.title}</span>
              </div>
              <a
                href={task.issueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                View <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};