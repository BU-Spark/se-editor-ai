import React from 'react';

interface OpenDocumentModalProps {
    title: string;
    showOpenConfirmation: boolean;
    setShowOpenConfirmation: (show: boolean) => void;
    editProject: () => void;
    promoteProject: () => void;
}

const OpenDocumentModal: React.FC<OpenDocumentModalProps> = ({
    title,
    showOpenConfirmation,
    setShowOpenConfirmation,
    editProject,
    promoteProject,
}) => {

    const handleClose = () => {
        setShowOpenConfirmation(false);
    }


    return (
        <>
            {showOpenConfirmation && (
                 
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="relative bg-white p-8 rounded-lg shadow-lg "
            style={{ width: '602px',
            height: '360px',
            borderRadius: '21px',
            backgroundColor: 'rgba(245, 240, 239, 0.95)',  // Semi-transparent background
            zIndex: 100
            }} >
                        <button
                            className="absolute top-2 right-2 text-xl py-2 px-2 font-bold text-black"
                            onClick={handleClose}
                        >
                            X
                        </button>
                        <p className="text-4xl font-newsreader text-center mb-6 mt-6">What would you like help with?</p>
                        <p className="text-2xl text-center mb-4 mt-10 underline">{title}</p>
                        <div className="flex justify-center gap-20 mt-16">
                            <button
                                className="bg-brand-red hover:bg-red-800 text-white font-poppins py-3 px-8 rounded-full"
                                style={{ minWidth: '200px', height: '80px',fontSize: '18px' }}
                                onClick={editProject}
                            >
                                Edit it
                            </button>
                            <button
                               className="bg-brand-red hover:bg-red-800 text-white font-poppins py-3 px-8 rounded-full"
                               style={{ minWidth: '200px', height: '80px',fontSize: '18px' }}
                                onClick={promoteProject}
                            >
                                Promote it
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default OpenDocumentModal;