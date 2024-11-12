"use client"
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'quill/dist/quill.snow.css';
import { useAuth } from '@/context/AuthContext';
import { updateDocument, getDocument } from '@/api/document_functions';
import { useRouter, useSearchParams } from 'next/navigation';

interface DocumentEditorProps {
    documentContent: string;
    setDocumentContent: (content: string) => void;
    documentId: string;
    setDocumentId: (documentId: string) => void;
}

const ReactQuillNoSSR = dynamic(
    () => import('react-quill'), 
    { ssr: false }
);

const DocumentEditor = ({ documentContent, setDocumentContent, documentId, setDocumentId }: DocumentEditorProps) => {
    const { user } = useAuth();
    const userId = user?.uid as string;
    const searchParams = useSearchParams();
    const [editing, setEditing] = useState(false);
    const [currentDocumentName, setCurrentDocumentName] = useState<string>('');
    const [initialDocumentName, setInitialDocumentName] = useState<string>('');

    useEffect(() => {
        const documentId = searchParams.get('documentid') as string;
        setDocumentId(documentId);

        const fetchDocument = async (documentId: string) => {
            const document = await getDocument(userId, documentId);
            setInitialDocumentName(document.message.Title);
            setCurrentDocumentName(document.message.Title);
            setDocumentContent(document.message.Content);
        };

        fetchDocument(documentId);
    }, []);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setCurrentDocumentName(newTitle);
        setEditing(initialDocumentName.trim() !== newTitle.trim());
    };

    const modules = {
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
            [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff"] }]
        ]
    };

    const formats = [
        "header", "bold", "italic",
        "underline", "strike", "blockquote",
        "list", "bullet", "indent",
        "link", "image", "align", "size", "color"
    ];

    const handleContentChange = async (content: string) => {
        setDocumentContent(content);
        await updateDocument(userId, documentId, initialDocumentName, content);
    };

    const submitNewTitle = () => {
        if (currentDocumentName.length > 0) {
            updateDocument(userId, documentId, currentDocumentName, documentContent);
            setEditing(false);
        }
    };

    return (
    <div className="flex flex-col h-full overflow-hidden ">
        {/* Title and Toolbar section */}
        <div className="sticky top-0 z-10 bg-white p-4 flex justify-between items-center ">
            <input
                className="text-2xl font-bold bg-transparent"
                placeholder={initialDocumentName}
                value={currentDocumentName}
                onChange={handleTitleChange}
            />
            {editing && (
                <button
                    className="bg-brand-red text-white font-bold py-2 px-4 rounded"
                    onClick={submitNewTitle}
                >
                    Save New Title
                </button>
            )}
        </div>

        <div className="flex-grow p-4 overflow-hidden">
            <ReactQuillNoSSR
                modules={modules}
                formats={formats}
                value={documentContent}
                placeholder="Write your content..."
                onChange={handleContentChange}
                style={{ height: '90%', maxHeight: 'calc(100vh - 10rem)',border: 'none', boxShadow: 'none', outline: 'none' }}
            />
        </div>
    </div>
);


};

export default DocumentEditor;
