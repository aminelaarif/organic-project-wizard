
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Calendar } from "lucide-react"

interface ProjectCardProps {
  title: string;
  description: string;
  date: string;
  progress: number;
}

const ProjectCard = ({ title, description, date, progress }: ProjectCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl font-medium">{title}</CardTitle>
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
  );
};

export default ProjectCard;
