import React from 'react';
import { useRouter } from 'next/navigation';
import { handleRemoveDocument } from '../../api/document_functions';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import DeletionModal from './DeletionModal';
import OpenDocumentModal from './OpenDocumentModal';
import ProjectItemDisplay from './ProjectItemDisplay';

export interface ProjectItemProps {
  title: string;
  lastModified: string;
  documentId: string; 
  documentContent: string;
  onRemove: (documentId: string) => void;
}

/**
 * Represents a project item component.
 * @param {ProjectItemProps} props - The props for the ProjectItem component.
 * @returns {JSX.Element} The rendered ProjectItem component.
 */
const ProjectItem = ({
  title,
  lastModified,
  documentId,
  documentContent,
  onRemove
}: ProjectItemProps) => {
  const [deleted, setDeleted] = useState<boolean>(false);
  const router = useRouter();
  const { user } = useAuth();
  const userId = user?.uid as string;

  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState<boolean>(false);
  const [showOpenConfirmation, setShowOpenConfirmation] = useState<boolean>(false);

  /**
   * Function to navigate to the project's text editor.
   * @remarks
   * This function logs the project title and navigates to the text editor page with the specified document ID.
   */
  const editProject = () => {
    console.log(`Navigating to project: ${title}`);
    router.push(`./texteditor/?documentid=${documentId}`); // Pass documentId instead of key
  };

  /**
   * Promotes the project and navigates to the "promotearticles" page with the document ID as a query parameter.
   */
  const promoteProject = () => {
    console.log(`Promoting project: ${title}`);
    router.push(`./promotearticles/?documentid=${documentId}`);
  }


  /**
   * Handles the click event when the remove button is clicked.
   * Sets the deleted state to true and removes the document with the specified documentId.
   */
  const handleRemoveClick = async () => {
    console.log(`Removing project: ${title}`);
    setDeleted(true);
    await handleRemoveDocument(userId, documentId); // Pass documentId instead of key
    onRemove(documentId);
  };

  return (
    <>
      {!deleted && (
        <div className="w-64 bg-white rounded-lg shadow-md p-4 relative">

          <ProjectItemDisplay
            title={title}
            lastModified={lastModified}
            content={documentContent}
            setshowOpenConfirmation={setShowOpenConfirmation}
            setShowRemoveConfirmation={setShowRemoveConfirmation}
          />


          <OpenDocumentModal
            title={title}
            showOpenConfirmation={showOpenConfirmation}
            setShowOpenConfirmation={setShowOpenConfirmation}
            editProject={editProject}
            promoteProject={promoteProject}
          />
          

          <DeletionModal
            showRemoveConfirmation={showRemoveConfirmation}
            handleRemoveClick={handleRemoveClick}
            setShowRemoveConfirmation={setShowRemoveConfirmation}
            title={title}
          />
          
        </div>
      )}
    </>
  );
};

export default ProjectItem;