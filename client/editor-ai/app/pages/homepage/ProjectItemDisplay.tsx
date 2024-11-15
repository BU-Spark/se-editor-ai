import React, { useState } from 'react';

interface ProjectItemDisplayProps {
    title: string;
    lastModified: string;
    content:string;
    setshowOpenConfirmation: (value: boolean) => void;
    setShowRemoveConfirmation: (value: boolean) => void;
}

const ProjectItemDisplay: React.FC<ProjectItemDisplayProps> = ({ title, lastModified,content,setShowRemoveConfirmation,setshowOpenConfirmation }) => {


    return (
        <div>
            <h1 onClick={() => setshowOpenConfirmation(true)} className="text-xl mb-2 cursor-pointer">
                {title}
            </h1>
            <p className="text-gray-500 mb-2">{lastModified}</p>
            {/* <p className="text-black-500 mb-2">{content}</p> */}
            <button
                className="bg-transparent hover:bg-red-100 py-1 px-2 rounded absolute top-2 right-2 transition-colors duration-200"
                onClick={() => setShowRemoveConfirmation(true)}
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#801212"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>
        </div>
    );
};

export default ProjectItemDisplay;