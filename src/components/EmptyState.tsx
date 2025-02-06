
import { FolderPlus } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="animate-fade-in flex flex-col items-center justify-center h-[60vh] glass-panel rounded-2xl p-12">
      <FolderPlus className="h-16 w-16 text-gray-400 mb-6" />
      <h2 className="text-xl font-medium text-gray-900 mb-2">No projects yet</h2>
      <p className="text-gray-500 text-center max-w-md">
        Get started by creating your first architectural project. Click the "Create Project" button above to begin.
      </p>
    </div>
  );
};

export default EmptyState;
