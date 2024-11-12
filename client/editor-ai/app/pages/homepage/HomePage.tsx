"use client"
//import url=("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap");

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ProjectSection from './ProjectSection';
import SearchBar from './SearchBar';
import ActionButton from './ActionButton';
import DocumentModal from '../../components/DocumentModal';
import { useRouter } from 'next/navigation';
import { handleCreateDocument } from '../../api/document_functions';
import UploadButton from './UploadButton';
import DocumentCreation from './DocumentCreation';
import Divider from '@/components/Divider';
import PromoteButton from './PromoteButton';

const HomePage = () => {

  const [documentName, setDocumentName] = useState('');
  const [documentContent, setDocumentContent] = useState('');
  const [open, setOpen] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');


  
  const handleEditArticleModal = async () => {
    router.push("/pages/texteditor");
  }

  const handlePromoteArticleModal = async () => {
    router.push("/pages/promotearticles");
  }


  return (
    <div>
      {/* search bar */}
      <div className="mt-5 px-10">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      </div>
      {/* buttons */}
      <div className="flex mb-5 gap-10 px-11" style={{fontFamily:'Poppins'}}>
        <ActionButton onClick={() => setShowPopup(true)} icon="/+.svg"/>
        <UploadButton createDocument={handleCreateDocument} icon="/upload.svg"/>
        {/*<PromoteButton onClick={handlePromoteArticleModal} icon="/promote.svg"/>*/}
      </div>

      {/* document modal */}
      { <DocumentModal open={open} onClose={()=> setOpen(false)}> 
          <div className="flex flex-col gap-4" > 
          <h1 className="text-4xl font-newsreader mb-6">What would you like help with?</h1>
        <hr className="border-t-solid border-1 border-grey" /> 
        <div className="flex flex-row justify-center"> 
          <button 
            className="border border-neutral-300 py-1.5 px-10 
            bg-main-color hover:bg-red-800 text-white "
            onClick={handleEditArticleModal}
          > 
            Edit an article 
          </button>
          <button 
            className="border border-neutral-300 rounded-lg py-1.5 px-10 
            bg-main-color hover:bg-red-800 text-white text-xl "
            onClick={() => setOpen(false)}
          > 
      
            Promote an article 

          </button>
        </div>
        </div> 
      </DocumentModal> }

      {/* document creation popup */}
      <div className='p-8'>
      {showPopup && <DocumentCreation documentName={documentName} setDocumentName={setDocumentName} handleCreateDocument={handleCreateDocument} setShowPopup={setShowPopup} />}
      </div>
      <div className="px-6">
      <Divider />
      </div>

      {/* project section */}
      <div className='p-4 mr-40 font-newsreader'>
      <ProjectSection title={"Projects"} searchQuery={searchQuery} />
      </div>
    </div>
    
  );
};

export default HomePage;
