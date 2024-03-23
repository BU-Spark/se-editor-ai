import React from 'react';
import ProjectItem from './ProjectItem';

const ProjectSection = ({ title }) => {
  return (
    <div className="m-4">
      <h2 className="text-lg text-gray-700 mb-2">{title}</h2>
      <div className="flex flex-row overflow-x-auto">
        <ProjectItem/>
        <ProjectItem/>

      </div>
    </div>
  );
};

export default ProjectSection;