import React, { useState } from 'react';
import SaveWorkModal from '@/components/SaveWorkModal';
import { useRouter } from 'next/router';
import SearchBar from '@/components/SearchBar';
import OptionButton from './Options';
import SaveButton from './SaveFile';

interface SuggestionBoxProps {
  header: string;
  content: string;
  onShowAskAI?: () => void;
  incorrectLine?: string;
  correctLine?: string;
  documentContent: string;
  setDocumentContent: (content: string) => void;  
}

const SuggestionBox: React.FC<SuggestionBoxProps> = ({
  header,
  content,
  onShowAskAI,
  incorrectLine,
  correctLine,
  documentContent,
  setDocumentContent
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [showSaveContainer, setShowSaveContainer] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(true); // Add this state variable

  const handleClick = () => {
    setIsClicked(true);
  };

  const handleApplyClick = () => {
    if (incorrectLine && correctLine) {
      const regex = new RegExp(incorrectLine, 'g');
      const newContent = documentContent.replace(regex, correctLine);
      setDocumentContent(newContent);
      setIsVisible(false); // Set isVisible to false when handleApplyClick is called
    }
  };

  const handleOpenModal = () => {
    setOpen(true); // Open the modal
  };

  const handleShowAskAI = () => {

  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsClicked(false);
    setIsVisible(false); // Set isVisible to false when handleClose is called
  };

  if (!isVisible) {
    return null; // Render nothing if isVisible is false
  }

  return (
    <div>
      {!showSaveContainer && (
        <div onClick={() => setIsClicked(true)} className="button-container bg-brand-red rounded-lg p-2 m-2 flex-col">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <h1 className="font-newsreader text-2xl text-white underline">{header}</h1>
            </div>
          </div>

          {isClicked && (
            <div className="suggestion-actions">
              <p className="font-newsreader flex-1 text-white">{content}</p>
              <br />
              <p className="font-newsreader flex-1 text-white">Incorrect line: &quot;{incorrectLine}&quot;</p>
              <button
                onClick={handleApplyClick}
                className="action-button font-poppins text-red-700 rounded-md w-28 h-8 bg-white border border-red-700 m-2"
              >
                Apply
              </button>
              <button
                className="close-button font-poppins text-red-700 rounded-md w-28 h-8 bg-white border border-red-700 m-2"
                onClick={handleClose}
              >
                Ignore
              </button>
              <button
                onClick={handleShowAskAI}
                className="action-button font-poppins text-red-700 rounded-md w-64 h-16 bg-white border-2 border-red-700"
              >
                Ask AI
              </button>
            </div>
          )}
        </div>
      )}

      {/* {showSaveContainer && (
        <div className="button-container flex items-center justify-center p-4 bg-white">
          <p className="text-4xl font-newsreader text-center">Save Your Work</p>
          <div className="button-container">
            <SaveButton text="Save to Editor AI" onClick={handleOpenModal} />
            <SaveButton text="Download as..." />
            <SaveButton text="Save to Google Docs" />
          </div>
        </div>
      )} */}

      {/* {open && (
        <SaveWorkModal open={open} onClose={() => setOpen(false)}>
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-newsreader mb-6 text-bold text-center">
              Save to Editor AI
            </h1>
            <hr className="border-t-solid border-1 border-grey" />
            <div className="flex flex-row justify-center">
              <p>
                Title:
                <SearchBar />
              </p>
              <p>
                Tags:
                <SearchBar />
              </p>
              <button
                style={{ backgroundColor: '#801212', margin: '5px' }}
                className="action-button"
              >
                Save
              </button>
            </div>
          </div>
        </SaveWorkModal>
      )} */}
    </div>
  );
};

export default SuggestionBox;