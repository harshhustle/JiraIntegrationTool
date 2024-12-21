import React, { useState } from 'react';
import { createJiraApi } from '../services/jiraApi';
import type { JiraUser } from '../types/jira';
import UserInfo from './UserInfo';
import AuthForm from './AuthForm';

interface Props {
  onAuthSuccess: (domain: string, email: string, apiToken: string) => void;
}

const JiraAuth: React.FC<Props> = ({ onAuthSuccess }) => {
  const [domain, setDomain] = useState('');
  const [email, setEmail] = useState('');
  const [apiToken, setApiToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<JiraUser | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleVerify = async () => {
    setError('');
    setLoading(true);

    try {
      const jiraApi = createJiraApi(domain, email, apiToken);
      const user = await jiraApi.verifyAccess();
      setUserData(user);
      onAuthSuccess(domain, email, apiToken);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to verify Jira access. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (userData && !isEditing) {
    return (
      <UserInfo
        user={userData}
        domain={domain}
        onEdit={() => setIsEditing(true)}
      />
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {userData && isEditing ? 'Change Account' : 'Jira Authentication'}
      </h2>
      <AuthForm
        domain={domain}
        email={email}
        apiToken={apiToken}
        error={error}
        loading={loading}
        showContinue={userData && isEditing}
        onDomainChange={setDomain}
        onEmailChange={setEmail}
        onApiTokenChange={setApiToken}
        onSubmit={handleVerify}
        onContinue={handleCancel}
      />
    </div>
  );
};

export default JiraAuth;