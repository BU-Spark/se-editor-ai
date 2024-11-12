import React, { useEffect, useState } from 'react';
import ProjectItem from './ProjectItem';
import { getDocuments } from '@/api/document_functions';
import { useAuth } from '@/context/AuthContext';

const ProjectSection = ({ title, searchQuery }) => {
  const user = useAuth();
  const userId = user.user.uid;

  const [projects, setProjects] = useState(null);

    

  useEffect(() => {
    const fetchProjects = async () => {
        const response = await getDocuments(userId);

        if (response.message=="not found") {
          console.log("No projects found matching the search query.");
          return;
        }
        else {
          // setProjectCount(response.message.length);
          console.log('Response:', response); // Check the response structure
          setProjects(response.message);
        }

    };

    if (!projects) {
      fetchProjects();
    }
  }, []); // useEffect will run when userId changes


  const filteredProjects = projects ? projects.filter((project) => {
    return project.Title.toLowerCase().includes(searchQuery.toLowerCase());
  }) : [];
  

  return (
    <div className="m-4">
      <h2 className="text-lg text-gray-700">{title}</h2>
      <div className="flex flex-wrap gap-4"> 
      {filteredProjects ? (
        filteredProjects.map((document) => (
          <ProjectItem
            key={document.id}
            title={document.Title}
            content={document.Content}
            lastModified={document.LastModified}
            documentId={document.id}
          />
        ))
      ) : (
        <p>No projects found matching the search query.</p>
      )}
      </div>
    </div>
  );
};

export default ProjectSection;