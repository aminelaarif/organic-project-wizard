
import ProjectCard from "./ProjectCard";

interface Project {
  id: string;
  title: string;
  description: string;
  date: string;
  progress: number;
}

const ProjectList = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          title={project.title}
          description={project.description}
          date={project.date}
          progress={project.progress}
        />
      ))}
    </div>
  );
};

export default ProjectList;
