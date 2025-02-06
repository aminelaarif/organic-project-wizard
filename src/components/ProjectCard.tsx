
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Eye } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
  title: string;
  description: string;
  date: string;
  progress: number;
}

const ProjectCard = ({ title, description, date, progress }: ProjectCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <Card 
        className="hover:shadow-lg transition-all duration-200 cursor-pointer animate-fade-in group"
        onClick={() => setShowDetails(true)}
      >
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-medium">{title}</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {date}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gray-900 h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[600px] animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-2xl font-light">{title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
              <p className="text-gray-600">{description}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Start Date</h3>
              <p className="text-gray-600 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {date}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Progress</h3>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gray-900 h-2 rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">{progress}% Complete</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectCard;
