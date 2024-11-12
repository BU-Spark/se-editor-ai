"use client" 


import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
});

interface ProjectItemProps {
    id: string;
    title: string;
    lastModified: string;
    content:string;
}

const EnlargedProjectCard: React.FC<ProjectItemProps> = ({ id, title, lastModified, content }: ProjectItemProps) => {

    const router = useRouter();

    const editProject = () => {
        router.push(`./texteditor/?documentid=${id}`); // Pass documentId 
    };

    const maxCharacters = 200;

    const shortenedContent = content ? (content.length > maxCharacters ? `${content.substring(0, maxCharacters)} ...` : content) : '';
    
    return (
        <div className="bg-white rounded-lg shadow-md p-4 relative m-5">
            <div className='flex flex-col'>
                <div className='flex flex-row justify-between'>
                    <h1  className="text-xl font-bold font-poppins mb-2 cursor-pointer">{title}</h1>
                    <Image src='/document-color.svg' alt="open icon" width={50} height={50} onClick={editProject}/>
                </div>
                <p className="text-gray-500 mb-2">{lastModified}</p>
                {content && (
                    <ReactQuill
                        value={shortenedContent}
                        modules={{ toolbar: false }}
                        readOnly={true}
                    />
                )}         
            </div>
        </div>
    );
};

export default EnlargedProjectCard;