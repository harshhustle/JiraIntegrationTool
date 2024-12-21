import React, { useState } from 'react';
import { Bug } from 'lucide-react';
import Button from './Button';

const CreateBug: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating bug:', { title, description, priority });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-red-600">
        <Bug className="h-6 w-6" />
        <h2 className="text-xl font-semibold">Create Bug Report</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Brief description of the bug"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Steps to reproduce, expected behavior, actual behavior"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="primary">
            Create Bug Report
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateBug;