import React from 'react';
import { KeyRound, User, Lock } from 'lucide-react';
import Button from './Button';

interface AuthFormProps {
  domain: string;
  email: string;
  apiToken: string;
  error: string;
  loading: boolean;
  showContinue?: boolean;
  onDomainChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onApiTokenChange: (value: string) => void;
  onSubmit: () => void;
  onContinue?: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  domain,
  email,
  apiToken,
  error,
  loading,
  showContinue,
  onDomainChange,
  onEmailChange,
  onApiTokenChange,
  onSubmit,
  onContinue,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Jira Domain
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="your-domain"
            value={domain}
            onChange={(e) => onDomainChange(e.target.value)}
            className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Example: if your Jira URL is https://company.atlassian.net, enter "company"
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          API Token
        </label>
        <div className="relative">
          <input
            type="password"
            value={apiToken}
            onChange={(e) => onApiTokenChange(e.target.value)}
            className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <div className="flex gap-4">
        <Button
          onClick={onSubmit}
          disabled={loading || !domain || !email || !apiToken}
          variant="primary"
        >
          {loading ? 'Verifying...' : 'Verify Access'}
        </Button>
        {showContinue && (
          <Button
            onClick={onContinue}
            variant="outline"
          >
            Continue with current account
          </Button>
        )}
      </div>
    </div>
  );
};

export default AuthForm;