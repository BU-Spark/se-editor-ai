import React, { useEffect, useState } from 'react';
import ProjectItem from './ProjectItem';
import { getDocuments } from '@/api/document_functions';
import { useAuth } from '@/context/AuthContext';

const ProjectSection = ({ title, searchQuery }) => {
  const user = useAuth();
  const userId = user.user.uid;

  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([
    "All",
    "Athletics/Sports",
    "Business",
    "Opinion/Columns/Editorials",
    "Politics/City Hall/City Council",
    "Crime and Safety",
    "Transportation/Traffic",
    "Real Estate/Housing",
    "Education/Schools",
    "Food/Dining",
    "Weather",
    "Local History",
    "Activities/Events",
    "Aimed at Student Media",
    "Academic Programs/Departments",
    "Student Resources/Support",
    "Health & Wellness",
    "Career & Professional Development",
    "Community Engagement",
    "Arts & Culture",
    "Technology & Innovation"
  ]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await getDocuments(userId);
      if (response.message === "not found") {
        console.log("No projects found matching the search query.");
        return;
      } else {
        console.log('Response:', response);
        setProjects(response.message);
      }
    };

    fetchProjects();
  }, [userId]); // Fetch projects when userId changes

  const removeProject = (documentId) => {
    setProjects((prevProjects) => prevProjects.filter(project => project.id !== documentId));
  };

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === "All" || project.Category === selectedCategory;
    return project.Title.toLowerCase().includes(searchQuery.toLowerCase()) && matchesCategory;
  });

  return (
    <div className="m-4">
      <h2 className="text-2xl">{title}</h2>
      <div className="mb-4">
        <label htmlFor="categoryFilter" className="mr-2">Filter by Category:</label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded p-2"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap gap-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((document) => (
            <ProjectItem
              key={document.id}
              title={document.Title}
              content={document.Content}
              lastModified={document.LastModified}
              documentId={document.id}
              onRemove={removeProject}
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