import React, { useState } from 'react';
import { Search, Loader } from 'lucide-react';
import { securityTaskService } from '../../services/securityTasks';
import Button from '../Button';

interface Props {
  domain: string;
  email: string;
  apiToken: string;
  onValidStory: (storyKey: string) => void;
}

export const StoryKeyInput: React.FC<Props> = ({
  domain,
  email,
  apiToken,
  onValidStory,
}) => {
  const [storyKey, setStoryKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleValidate = async () => {
    setError('');
    setLoading(true);

    try {
      const isValid = await securityTaskService.validateStoryKey(
        storyKey,
        domain,
        email,
        apiToken
      );

      if (isValid) {
        onValidStory(storyKey);
      } else {
        setError('Invalid story key. Please check and try again.');
      }
    } catch (err) {
      setError('Failed to validate story key.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Story Key
      </label>
      <div className="flex gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={storyKey}
            onChange={(e) => setStoryKey(e.target.value.toUpperCase())}
            placeholder="Enter story key (e.g., PROJ-123)"
            className="pl-9 w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        <Button
          onClick={handleValidate}
          disabled={loading || !storyKey}
          variant="primary"
          size="sm"
        >
          {loading ? (
            <>
              <Loader className="animate-spin h-4 w-4 mr-2" />
              Validating...
            </>
          ) : (
            'Validate'
          )}
        </Button>
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};