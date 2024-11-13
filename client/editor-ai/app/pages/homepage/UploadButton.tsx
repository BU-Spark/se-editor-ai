"use client"

import React, { useRef, ChangeEvent } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

type UploadButtonProps = {
    createDocument: (userId: string, fileName: string, fileContent: string, category: string) => void;
    icon?: React.ReactNode;  
};

function UploadButton({ createDocument, icon }: UploadButtonProps) {
    const { user } = useAuth();
    const userId = user?.uid as string;
    const inputFileRef = useRef<HTMLInputElement>(null);

    const router = useRouter();


const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        const fileName = file.name;
        try {
            const fileContent = await readContents(file);
            console.log("User ID: ", userId);
            console.log("File Name: ", fileName);
            console.log("File Content: ", fileContent);
            const documentId = await createDocument(userId, fileName, fileContent, "");
            console.log('DocumentId:', documentId);

            router.push(`/pages/texteditor?documentid=${documentId}`)
        } catch (error) {
            console.error('Error reading file content:', error);
        }
    }
};


const readContents = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            // Force TypeScript to treat the result as a string
            resolve(e.target!.result as string);
        };
        reader.onerror = e => reject(e);
        reader.readAsText(file);
    });
};

    const handleClick = () => {
        // This function is triggered when the custom button is clicked
        inputFileRef.current?.click();
    };

    return (
        <div className="upload-btn-container" style={{ position: 'relative', overflow: 'hidden', display: 'inline-block' }}>
             <input
            />
            <button 
                onClick={handleClick} 
                className= "font-poppins h-48 w-36 inline-block m-4 px-4 py-2 border-4 custom-border-color rounded bg-brand-tan text-black cursor-pointer text-base transition-colors duration-300 ease-in-out mr-2 hover:bg-red-800 hover:text-white flex flex-col items-center justify-center"
                style={{}}>
                {icon && <img src="/upload.svg" className="icon-class mb-8" alt="icon" style={{ width: '26px', height: '26px' }} />}
                Upload Document
            </button>
        
            <input
                ref={inputFileRef}
                type="file"
                onChange={handleFileUpload}
                accept=".txt"
                style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
            />
        </div>
    );
}

export default UploadButton;