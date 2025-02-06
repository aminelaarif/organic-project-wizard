
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from 'lucide-react';
import ProjectWizard from '@/components/ProjectWizard';
import EmptyState from '@/components/EmptyState';

const Index = () => {
  const [showWizard, setShowWizard] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-light tracking-tight text-gray-900">Projects</h1>
          <Button
            onClick={() => setShowWizard(true)}
            className="bg-gray-900 hover:bg-gray-800 text-white transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Create Project
          </Button>
        </div>

        <EmptyState />

        {showWizard && (
          <ProjectWizard onClose={() => setShowWizard(false)} />
        )}
      </div>
    </div>
  );
};

export default Index;
