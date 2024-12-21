import React, { useState } from 'react';
import { Search, Loader } from 'lucide-react';
import { createJiraApi } from '../services/jiraApi';
import type { JiraIssue } from '../types/jira';
import Button from './Button';

interface Props {
  domain: string;
  email: string;
  apiToken: string;
}

const JiraIssue: React.FC<Props> = ({ domain, email, apiToken }) => {
  const [issueKey, setIssueKey] = useState('');
  const [issue, setIssue] = useState<JiraIssue | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetchIssue = async () => {
    setError('');
    setLoading(true);

    try {
      const jiraApi = createJiraApi(domain, email, apiToken);
      const issueData = await jiraApi.getIssue(issueKey);
      setIssue(issueData);
    } catch (err) {
      setError('Failed to fetch issue. Please check the issue key.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter issue key (e.g., PROJ-123)"
              value={issueKey}
              onChange={(e) => setIssueKey(e.target.value)}
              className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <Button
          onClick={handleFetchIssue}
          disabled={loading || !issueKey}
          variant="primary"
        >
          {loading ? (
            <>
              <Loader className="animate-spin h-5 w-5 mr-2" />
              Loading...
            </>
          ) : (
            'Fetch Issue'
          )}
        </Button>
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      {issue && (
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {issue.fields.summary}
            </h3>
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
              {issue.key}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Status</h4>
              <p className="mt-1">{issue.fields.status.name}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Priority</h4>
              <p className="mt-1">{issue.fields.priority.name}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Assignee</h4>
              <p className="mt-1">{issue.fields.assignee?.displayName || 'Unassigned'}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Reporter</h4>
              <p className="mt-1">{issue.fields.reporter.displayName}</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Description</h4>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm whitespace-pre-wrap">
                {issue.fields.description || 'No description provided'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
            <div>
              Created: {new Date(issue.fields.created).toLocaleString()}
            </div>
            <div>
              Updated: {new Date(issue.fields.updated).toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JiraIssue;