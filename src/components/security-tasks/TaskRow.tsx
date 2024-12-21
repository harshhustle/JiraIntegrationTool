import React from 'react';
import { Calendar, ChevronDown, ExternalLink, Loader } from 'lucide-react';
import type { SecurityTask, CreatedTask } from '../../types/security-tasks';
import type { TaskData } from '../../types/task-data';
import Button from '../Button';

interface TaskRowProps {
  type: SecurityTask['type'];
  data: TaskData;
  createdTask: CreatedTask | null;
  creatingTask: string | null;
  sprints: Array<{ id: string; name: string }>;
  onUpdateData: (field: keyof TaskData, value: string | number) => void;
  onCreateTask: () => void;
}

export const TaskRow: React.FC<TaskRowProps> = ({
  type,
  data,
  createdTask,
  creatingTask,
  sprints,
  onUpdateData,
  onCreateTask,
}) => {
  const isCreating = creatingTask === type;
  
  return (
    <tr className={creatingTask && !isCreating ? 'opacity-50' : ''}>
      <td className="px-4 py-2 text-sm text-gray-500">
        {createdTask ? (
          data.title
        ) : (
          <input
            type="text"
            value={data.title}
            onChange={(e) => onUpdateData('title', e.target.value)}
            className="w-full border border-gray-300 rounded-md text-sm px-2 py-1 focus:ring-blue-500 focus:border-blue-500"
          />
        )}
      </td>
      <td className="px-4 py-2 text-sm text-gray-500">
        {createdTask ? (
          data.description
        ) : (
          <textarea
            value={data.description}
            onChange={(e) => onUpdateData('description', e.target.value)}
            className="w-full border border-gray-300 rounded-md text-sm px-2 py-1 focus:ring-blue-500 focus:border-blue-500"
            rows={2}
          />
        )}
      </td>
      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
        {createdTask ? (
          data.storyPoints
        ) : (
          <input
            type="number"
            value={data.storyPoints}
            onChange={(e) => onUpdateData('storyPoints', parseInt(e.target.value, 10))}
            min={0}
            max={13}
            className="w-16 border border-gray-300 rounded-md text-sm px-2 py-1 focus:ring-blue-500 focus:border-blue-500"
          />
        )}
      </td>
      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
        {createdTask ? (
          data.sprint || '-'
        ) : (
          <div className="relative">
            <select
              value={data.sprint}
              onChange={(e) => onUpdateData('sprint', e.target.value)}
              className="appearance-none w-36 bg-white border border-gray-300 rounded-md py-1 pl-7 pr-7 text-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Sprint</option>
              {sprints.map((sprint) => (
                <option key={sprint.id} value={sprint.name}>
                  {sprint.name}
                </option>
              ))}
            </select>
            <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
          </div>
        )}
      </td>
      <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
        {createdTask ? (
          <a
            href={createdTask.issueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            {createdTask.issueKey}
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        ) : (
          <Button
            onClick={onCreateTask}
            disabled={creatingTask !== null}
            variant="primary"
            size="sm"
          >
            {isCreating ? (
              <>
                <Loader className="animate-spin h-3 w-3 mr-1" />
                Creating...
              </>
            ) : (
              'Create'
            )}
          </Button>
        )}
      </td>
    </tr>
  );
};