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

    useEffect(() => {
        const fetchDocument = async (documentId: string) => {
            try {
                const document = await getDocument(id, documentId);
                if(!document) {
                    return;
                }
                else {
                    setDocumentContent(document.message.Content);
                    setDocumentTitle(document.message.Title);
                    setDocumentLastModified(document.message.LastModified);
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
                        <a className="text-main-color font-bold font-newsreader flex items-center">
                        <img src="/back.svg" alt="logo" width={25} height={25} style={{ marginRight: '10px' , marginTop: '15px', marginBottom:'0px'}}/>
                        <span className="mt-5 text-2xl font-poppins"> Back </span> </a>
                    </Link>
                    </div>

            {/* layout 2 */}
            <div className=" flex flex-row justify-between items-start gap-5">

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
            </div>
        </div>
    );
    
};

export default PromoteArticle;