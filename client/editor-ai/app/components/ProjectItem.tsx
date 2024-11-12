import React from 'react';
import '../styles/ProjectItem.css';

// Define the structure of the project prop
interface Project {
  name: string;
  // Add any other project properties you might have
}

// Define the props for ProjectItem
interface ProjectItemProps {
  key: string; // Actually, you don't need to define 'key' prop explicitly here, as it's a built-in React prop for list items
  project: Project;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  // Implementation that uses the project prop
  return (
    <div>
      {/* Example usage */}
      <h3>{project.name}</h3>
      {/* Render other project details */}
    </div>
  );
};

export default ProjectItem;
