"use client"
import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'quill/dist/quill.snow.css';
import { useAuth } from '@/context/AuthContext';
import { updateDocument, getDocument } from '@/api/document_functions';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface DocumentEditorProps {
    documentContent: string;
    setDocumentContent: (content: string) => void;
    documentId: string;
    setDocumentId: (documentId: string) => void;
    onTextSelect?: (selectedText: string) => void;
}

const ReactQuillNoSSR = dynamic(
    () => import('react-quill'), 
    { ssr: false }
);

const DocumentEditor = ({ documentContent, setDocumentContent, documentId, setDocumentId, onTextSelect }: DocumentEditorProps) => {
    const { user } = useAuth();
    const userId = user?.uid as string;
    const searchParams = useSearchParams();
    const [currentDocumentName, setCurrentDocumentName] = useState<string>('');
    const [initialDocumentName, setInitialDocumentName] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const quillRef = useRef<any>(null);
    const [isEditorFocused, setIsEditorFocused] = useState(false);
    const saveTimeoutRef = useRef<NodeJS.Timeout>();

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
        
        // Clear any existing timeout
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }

        // Set a new timeout to save after 1 second of no typing
        saveTimeoutRef.current = setTimeout(() => {
            if (newTitle.length > 0 && newTitle.trim() !== initialDocumentName.trim()) {
                updateDocument(userId, documentId, newTitle, documentContent, category);
                setInitialDocumentName(newTitle); // Update the initial title after saving
            }
        }, 1000);
    };

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
        };
    }, []);

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
        await updateDocument(userId, documentId, initialDocumentName, content, category);
    };

    const submitNewTitle = () => {
        if (currentDocumentName.length > 0) {
            updateDocument(userId, documentId, currentDocumentName, documentContent, category);
            setEditing(false);
        }
    };

    const handleSelection = (range: any, source: string, editor: any) => {
        if (range && range.length > 0) {
            const selectedText = editor.getText(range.index, range.length).trim();
            console.log('Selected text:', selectedText);
            if (onTextSelect) {
                onTextSelect(selectedText);
            }
        } else if (onTextSelect) {
            onTextSelect('');
        }
    };

    const handleFocus = () => {
        setIsEditorFocused(true);
        console.log('Editor focused');
    };

    const handleBlur = () => {
        setIsEditorFocused(false);
        console.log('Editor lost focus');
    };

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="sticky top-0 z-10 bg-white pl-4 pt-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link href="./homepage" legacyBehavior>
                            <a className="text-brand-red font-bold flex items-center mr-2">
                                <svg 
                                    width="20" 
                                    height="20" 
                                    viewBox="0 0 24 24" 
                                    className="mr-2"
                                >
                                    <path 
                                        d="M15 18L9 12L15 6" 
                                        stroke="currentColor" 
                                        strokeWidth="2" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                        fill="none"
                                    />
                                </svg>
                            </a>
                        </Link>
                        <input
                            className="text-2xl"
                            placeholder={initialDocumentName}
                            value={currentDocumentName}
                            onChange={handleTitleChange}
                        />
                    </div>
                </div>
            </div>
            <div className="flex-grow px-0 pb-0 pt-4 overflow-hidden [&_.ql-container.ql-snow]:border-0 [&_.ql-toolbar.ql-snow]:border-x-0 [&_.ql-toolbar.ql-snow]:border-t">
                <ReactQuillNoSSR
                    ref={quillRef}
                    modules={modules}
                    formats={formats}
                    value={documentContent}
                    placeholder="Write your content..."
                    onChange={handleContentChange}
                    onChangeSelection={handleSelection}
                    style={{ 
                        height: '95%', 
                        maxHeight: 'calc(100vh - 8rem)',
                        border: 'none', 
                        boxShadow: 'none', 
                        outline: 'none'
                    }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
        </div>
    );
};

export default DocumentEditor;
