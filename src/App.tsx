import React, { useState } from 'react';
import JiraAuth from './components/JiraAuth';
import JiraIssue from './components/JiraIssue';
import CreateTask from './components/CreateTask';
import CreateBug from './components/CreateBug';
import Tabs from './components/Tabs';

const TABS = [
  { id: 'fetch', label: 'Fetch Issue' },
  { id: 'task', label: 'Create Task' },
  { id: 'bug', label: 'Create Bug' },
];

interface AuthData {
  domain: string;
  email: string;
  apiToken: string;
}

function App() {
  const [auth, setAuth] = useState<AuthData | null>(null);
  const [activeTab, setActiveTab] = useState('fetch');

  const handleAuthSuccess = (domain: string, email: string, apiToken: string) => {
    setAuth({ domain, email, apiToken });
  };

  const renderActiveTab = () => {
    if (!auth) return null;

    switch (activeTab) {
      case 'fetch':
        return (
          <JiraIssue
            domain={auth.domain}
            email={auth.email}
            apiToken={auth.apiToken}
          />
        );
      case 'task':
        return (
          <CreateTask
            domain={auth.domain}
            email={auth.email}
            apiToken={auth.apiToken}
          />
        );
      case 'bug':
        return <CreateBug />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Authentication Section */}
      <div className="p-6">
        <div className="max-w-full">
          <JiraAuth onAuthSuccess={handleAuthSuccess} />
        </div>
      </div>

      {/* Actions Section */}
      {auth && (
        <div className="px-6">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <Tabs
                tabs={TABS}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
              <div className="mt-6">
                {renderActiveTab()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;