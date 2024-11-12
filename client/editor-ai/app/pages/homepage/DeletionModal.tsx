import React from 'react';

interface DeletionModalProps {
    showRemoveConfirmation: boolean;
    handleRemoveClick: () => void;
    setShowRemoveConfirmation: (show: boolean) => void;
    title:string;
}

const DeletionModal: React.FC<DeletionModalProps> = ({
    showRemoveConfirmation,
    handleRemoveClick,
    setShowRemoveConfirmation,
    title
}) => {
    return (
        <>
            {showRemoveConfirmation && (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <p className="text-xl mb-4">Are you sure you want to remove this project?</p>
                        <p className="text-lg mb-4">{title}</p>
                        <div className="flex justify-center">
                            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-4" onClick={handleRemoveClick}>
                                Yes
                            </button>
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                                onClick={() => setShowRemoveConfirmation(false)}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeletionModal;