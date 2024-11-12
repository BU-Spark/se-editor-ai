"use client" 

import React, { useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/navigation';
import { generateSocialMediaCopy } from '@/api/handle_ai';
import Image from 'next/image';
import DocumentCreation from '../homepage/DocumentCreation';

interface CopyEditorProps {
    documentContent:string;
    copyText: string;
    setCopyText: (content: string) => void;

}
const ReactQuillNoSSR = dynamic(
    () => import('react-quill'), 
    { ssr: false }
);


/**
 * CopyEditor component for generating social media copy.
 * @param {Object} props - The component props.
 * @param {string} props.documentContent - The content of the document.
 * @param {string} props.copyText - The generated social media copy.
 * @param {Function} props.setCopyText - The function to update the generated social media copy.
 * @returns {JSX.Element} The CopyEditor component.
 */
const CopyEditor: React.FC<CopyEditorProps> = ({
    documentContent,
    copyText,
    setCopyText
}:CopyEditorProps) => {

    const router = useRouter();

    var modules = {
        toolbar: [
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
                { align: [] }
            ],
            [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
        ]
    };

    var formats = [
        "header", "height", "bold", "italic",
        "underline", "strike", "blockquote",
        "list", "color", "bullet", "indent",
        "link", "image", "align", "size",
    ];

    /**
     * Handles the change in copy content.
     * @param {string} content - The new copy content.
     * @returns {Promise<void>}
     */
    const handleCopyContentChange = async (content: string) => {
        setCopyText(content);
    };

    /**
     * Handles the refresh of the generated social media copy.
     * @returns {Promise<void>}
     */
    const handleRefreshCopy = async () => {
        console.log("documentContent " + documentContent)
        const res= await generateSocialMediaCopy(documentContent) as string;
        setCopyText(res)
        console.log(res)
    };

    return (
        <div>
            <div className='shadow-md flex flex-col bg-white rounded-lg p-4 m-4 relative'>
                <div className='flex flex-row justify-between m-1 p-3'>
                    <h1 className='text-2xl font-bold font-poppins'>EditorAI&apos;s Social Media Copy</h1>
                    <Image src='/refresh-color.svg' alt="refresh icon" width={45} height={45} onClick={handleRefreshCopy}/>
                </div>

                <ReactQuillNoSSR
                    modules={modules}
                    formats={formats}
                    value={copyText}
                    placeholder={"Generate social media copy here..."}
                    onChange={handleCopyContentChange}
                />
            </div>
        </div>
    );
};

export default CopyEditor;