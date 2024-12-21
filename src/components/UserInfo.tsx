import React from 'react';
import { User } from 'lucide-react';
import type { JiraUser } from '../types/jira';
import Button from './Button';

interface UserInfoProps {
  user: JiraUser;
  domain: string;
  onEdit: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ user, domain, onEdit }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="bg-blue-100 p-2 rounded-full">
          <User className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{user.displayName}</h3>
          <p className="text-sm text-gray-500">{domain}.atlassian.net</p>
        </div>
      </div>
      <Button
        onClick={onEdit}
        variant="outline"
        size="sm"
      >
        Change Account
      </Button>
    </div>
  );
};

export default UserInfo;