
import { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, ArrowLeft, X } from 'lucide-react';

interface ProjectWizardProps {
  onClose: () => void;
  onComplete: (projectData: any) => void;
}

const STEPS = [
  {
    title: "Project Basics",
    checkboxes: ["Residential", "Commercial", "Industrial"],
    selects: [
      { label: "Project Scale", options: ["Small", "Medium", "Large"] },
      { label: "Location Type", options: ["Urban", "Suburban", "Rural"] },
      { label: "Timeline", options: ["3 months", "6 months", "12 months"] },
    ],
  },
  {
    title: "Design Preferences",
    checkboxes: ["Modern", "Traditional", "Minimalist"],
    selects: [
      { label: "Materials", options: ["Concrete", "Wood", "Steel"] },
      { label: "Sustainability", options: ["Basic", "Advanced", "Premium"] },
      { label: "Budget Range", options: ["$100k-500k", "$500k-1M", "$1M+"] },
    ],
  },
  {
    title: "Additional Details",
    checkboxes: ["Need Permits", "Has Contractor", "Requires Consulting"],
    selects: [
      { label: "Team Size", options: ["Small (1-3)", "Medium (4-7)", "Large (8+)"] },
      { label: "Priority Level", options: ["Low", "Medium", "High"] },
      { label: "Complexity", options: ["Simple", "Moderate", "Complex"] },
    ],
  },
];

const ProjectWizard = ({ onClose, onComplete }: ProjectWizardProps) => {
  const [step, setStep] = useState(0);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<Record<number, string[]>>({});
  const [selectedSelects, setSelectedSelects] = useState<Record<number, Record<string, string>>>({});

  const currentStep = STEPS[step];

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      // When reaching the last step, call onComplete with the collected data
      onComplete({
        projectName: selectedSelects[0]?.["Project Scale"] || "",
        description: `A ${selectedSelects[0]?.["Project Scale"]?.toLowerCase() || ""} scale project with ${selectedCheckboxes[0]?.join(", ") || "various"} features`
      });
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const toggleCheckbox = (value: string) => {
    setSelectedCheckboxes(prev => {
      const current = prev[step] || [];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [step]: updated };
    });
  };

  const handleSelect = (label: string, value: string) => {
    setSelectedSelects(prev => ({
      ...prev,
      [step]: { ...(prev[step] || {}), [label]: value },
    }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <div className="animate-scale-in">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-light">{currentStep.title}</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            {/* Progress indicator */}
            <div className="flex gap-2 mt-4">
              {STEPS.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    index <= step ? 'bg-gray-900' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Checkboxes */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Type</h3>
              <div className="space-y-3">
                {currentStep.checkboxes.map((label) => (
                  <label key={label} className="flex items-center space-x-3 cursor-pointer group">
                    <Checkbox
                      checked={(selectedCheckboxes[step] || []).includes(label)}
                      onCheckedChange={() => toggleCheckbox(label)}
                      className="transition-all duration-200 data-[state=checked]:bg-gray-900"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                      {label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Selects */}
            <div className="space-y-4">
              {currentStep.selects.map(({ label, options }) => (
                <div key={label}>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">{label}</h3>
                  <Select
                    value={selectedSelects[step]?.[label]}
                    onValueChange={(value) => handleSelect(label, value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t bg-gray-50/80 backdrop-blur-sm flex justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={step === 0}
              className="transition-all duration-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button
              onClick={step === STEPS.length - 1 ? handleNext : handleNext}
              className="bg-gray-900 hover:bg-gray-800 text-white transition-all duration-200"
            >
              {step === STEPS.length - 1 ? (
                'Complete'
              ) : (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectWizard;
