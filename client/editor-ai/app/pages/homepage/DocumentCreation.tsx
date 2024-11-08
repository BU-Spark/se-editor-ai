import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import CreateDocumentModal from '@/components/CreateDocumentModal';

interface Props {
  setDocumentName: (name: string) => void;
  handleCreateDocument: (userId: string, documentName: string, documentContent: string) => Promise<string | null>;
  setShowPopup: (showPopup: boolean) => void;
  documentName: string;
}

const DocumentCreation: React.FC<Props> = ({ setDocumentName, handleCreateDocument, setShowPopup, documentName }) => {
  const [createDocumentFailed, setCreateDocumentFailed] = useState(false);

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const router = useRouter();
  const { userId } = useAuth();
  // const userId = user?.uid as string;

  const handlePopupSubmit = async () => {
    const documentId = await handleCreateDocument(userId, documentName, "");
    console.log('DocumentId:', documentId);
    if (documentId == null) {
      setCreateDocumentFailed(true);
      console.log('Document creation failed');
    } else {
      router.push(`/pages/texteditor?documentid=${documentId}`);
    }
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="bg-brand-tan p-8 rounded-xl w-full max-w-2xl shadow-lg w-96" style={{ minHeight: '40vh', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.4)'}}>
        <div className="popup-content flex flex-col items-center justify-center space-y-4">
          {createDocumentFailed && <h1 className="text-red-500 mb-4">That document name already exists</h1>}
          <>
          <h1 className="text-4xl font-newsreader mb-6">Create Document</h1>
            <input
              type="text"
              placeholder="Enter document name"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              className="focus:outline-none focus:ring-2 focus:ring-red-800 rounded-xl p-3 m-2 bg-white text-lg w-3/4 font-poppins shadow-md p-2"
            />
              <hr className="border-t-solid border-1 border-grey p-3" /> 
            <div className="flex flex-row justify-center gap-10 ">
              <button onClick={handlePopupSubmit}className=" font-poppins rounded-full border border-neutral-300 py-4 px-10
            bg-main-color hover:bg-red-800 text-white text-lg w-auto" style={{background: 'radial-gradient(50% 50% at 50% 50%, #9F4949 0%, #801212 100%)'}}>
                Submit
              </button>
              <button onClick={handlePopupClose}className="font-poppins rounded-full border border-neutral-300 py-4 px-10
            bg-main-color hover:bg-red-800 text-white text-lg w-auto " style={{background: 'radial-gradient(50% 50% at 50% 50%, #9F4949 0%, #801212 100%)'}}> Cancel
              </button>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default DocumentCreation;
