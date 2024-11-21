'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DocumentEditor from './DocumentEditor';
import Aside from './Aside';
import ResizableSlider from '@/components/ResizableSlider';

const TextEditor = () => {
    const [editorWidth, setEditorWidth] = useState(75);
    const [documentContent, setDocumentContent] = useState('');
    const [documentId, setDocumentId] = useState<string | ''>('');
    const [selectedText, setSelectedText] = useState('');
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Text Editor Section */}
            <div id="editorsection" className="bg-white flex flex-col h-[calc(100vh-6rem)]" style={{ width: `${editorWidth}%` }}>
                {/* Document Editor */}
                <div className="flex-grow overflow-auto"> 
                    <DocumentEditor 
                        documentContent={documentContent} 
                        setDocumentContent={setDocumentContent} 
                        documentId={documentId}
                        setDocumentId={setDocumentId}
                        onTextSelect={setSelectedText}
                    />
                </div>
            </div>

            {/* Resizable Slider */}
            <ResizableSlider editorWidth={editorWidth} setEditorWidth={setEditorWidth} />

            {/* Aside Section */}
            <div id="asidesection" className="flex flex-col bg-gray-100 border-l border-gray-200 h-full overflow-hidden" style={{ width: `${100 - editorWidth}%` }}>
                <Aside documentContent={documentContent} setDocumentContent={setDocumentContent} selectedText={selectedText} />
            </div>
        </div>
    );
};

export default TextEditor;
