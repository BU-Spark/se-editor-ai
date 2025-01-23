// In ProjectSection.tsx

import React from 'react';
import ProjectItem from './ProjectItem';


// Update or add this interface to include the 'projects' array
interface Project {
  name: string;
}

interface ProjectSectionProps {
  projects: Project[];
  title: string;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ projects, title }) => {
  return (
    <div>
      <h2 className='p-4 mr-6'>{title}</h2>
      <div>
        {projects.map((project) => (
          <ProjectItem key={project.name} project={project} /> // Assuming ProjectItem accepts a 'project' prop
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
