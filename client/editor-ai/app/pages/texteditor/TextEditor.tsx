'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DocumentEditor from './DocumentEditor';
import Aside from './Aside';
import ResizableSlider from '@/components/ResizableSlider';

const TextEditor = () => {
    const [editorWidth, setEditorWidth] = useState(50);
    const [documentContent, setDocumentContent] = useState('');
    const [documentId, setDocumentId] = useState<string | null>(null);

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Text Editor Section */}
            <div id="editorsection" className="bg-white flex flex-col h-[calc(100vh-8rem)]" style={{ width: `${editorWidth}%` }}>
                <div className="p-4 h-10 flex justify-between items-center">
                    {/* Back Button */}
                    <Link href="./homepage" legacyBehavior>
                        <a className="text-main-color font-bold font-newsreader flex items-center">
                            <Image src="/back.svg" alt="logo" width={25} height={25} style={{ marginRight: '10px', marginTop: '15px', marginBottom: '0px' }} />
                            <span className="mt-5 text-2xl font-poppins"> Back </span>
                        </a>
                    </Link>
                </div>

                {/* Document Editor */}
                <div className="flex-grow overflow-auto"> 
                    <DocumentEditor 
                        documentContent={documentContent} 
                        setDocumentContent={setDocumentContent} 
                        documentId={documentId}
                        setDocumentId={setDocumentId}
                    />
                </div>
            </div>

            {/* Resizable Slider */}
            <ResizableSlider editorWidth={editorWidth} setEditorWidth={setEditorWidth} />

            {/* Aside Section */}
            <div id="asidesection" className="flex flex-col bg-gray-100 border-l border-gray-200 h-full overflow-hidden" style={{ width: `${100 - editorWidth}%` }}>
                <Aside documentContent={documentContent} setDocumentContent={setDocumentContent} />
            </div>
        </div>
    );
};

export default TextEditor;
