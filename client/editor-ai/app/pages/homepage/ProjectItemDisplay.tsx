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
            <h1 onClick={() => setshowOpenConfirmation(true)} className="text-xl font-bold mb-2 cursor-pointer">
                {title}
            </h1>
            <p className="text-gray-500 mb-2">{lastModified}</p>
            {/* <p className="text-black-500 mb-2">{content}</p> */}
            <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded absolute top-2 right-2 text-xs"
                onClick={() => setShowRemoveConfirmation(true)}
            >
                X
            </button>
        </div>
    );
};

export default ProjectItemDisplay;