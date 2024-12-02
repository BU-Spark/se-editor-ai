"use client"

import React, { useEffect, useState } from 'react';
import EnlargedProjectCard from './EnlargedProjectCard'
import { useAuth } from '@/context/AuthContext';
import { getDocument } from '@/api/document_functions';
import { useSearchParams } from 'next/navigation';
import CopyEditor from './CopyEditor';
import Link from 'next/link';
import SocialMediaContainer from './SocialMediaContainer';

const PromoteArticle = () => {
    const { id } = useAuth();
    const searchParams = useSearchParams();
    const documentId = searchParams.get('documentid') as string;
    const [copyText, setCopyText] = useState<string>("Click the refresh button to generate a new social media copy.")
    const [documentContent, setDocumentContent] = useState<string>('');
    const [documentTitle, setDocumentTitle] = useState<string>('');
    const [documentLastModified, setDocumentLastModified] = useState<string>('');
    const [isClient, setIsClient] = useState<boolean>(false);

    useEffect(() => {
        const fetchDocument = async (documentId: string) => {
          try {
            const document = await getDocument(id, documentId);
            if (!document) {
              return;
            } else {
              setDocumentContent(document.message.Content);
              setDocumentTitle(document.message.Title);
              setDocumentLastModified(document.message.LastModified);
              setIsClient(true);
            }
          } catch (error) {
            console.log("Error fetching document:", error);
          }
        };
        fetchDocument(documentId);
      }, []);

    return (
        <div className="p-10 bg-brand-tan min-h-screen">
            <h1 className="text-3xl text-center m-5 mb-2 font-newsreader">Promote your Project: {documentTitle}</h1>
            <div className="flex items-center justify-start mb-5">
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
                    <span className="text-2xl font-poppins">Back</span>
                </a>
            </Link>
            </div>

            {/* layout 2 */}
            {isClient && (<div className=" flex flex-row justify-between items-start gap-5">

                <div className='w-4/5 flex justify-evenly flex-col'>
                    <SocialMediaContainer copy={copyText} />
                    <EnlargedProjectCard
                        id={documentId}
                        title={documentTitle}
                        lastModified={documentLastModified}
                        content={documentContent}
                    />
                </div>
                <div className='w-4/5'>
                    <CopyEditor documentContent={documentContent} copyText={copyText} setCopyText={setCopyText} />
                </div>
            </div>)}
        </div>
    );
    
};

export default PromoteArticle;