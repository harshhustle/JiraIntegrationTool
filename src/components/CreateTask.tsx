import React from 'react';
import SecurityTaskCreator from './security-tasks/SecurityTaskCreator';

interface Props {
  domain: string;
  email: string;
  apiToken: string;
}

const CreateTask: React.FC<Props> = ({ domain, email, apiToken }) => {
  if (!domain || !email || !apiToken) {
    return (
      <div className="text-center text-gray-600 py-8">
        Please complete authentication first
      </div>
    );
  }

  return (
    <SecurityTaskCreator
      domain={domain}
      email={email}
      apiToken={apiToken}
    />
  );
};

export default CreateTask;