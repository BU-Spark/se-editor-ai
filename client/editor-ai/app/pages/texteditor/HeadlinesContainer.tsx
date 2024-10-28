interface HeadlinesContainerProps {  
    headlines: string;
    onClose: () => void;
}

const HeadlinesContainer: React.FC<HeadlinesContainerProps> = ({ headlines, onClose }) => {
    return (
        <div className="headlines-container p-4 border rounded shadow-md mb-6">
            <h2 className="text-xl font-bold mb-2">Headlines</h2>
            <div className="mb-4 whitespace-pre-line">{headlines}</div>
            <button 
                onClick={onClose} 
                className="shadow-md px-6 py-1 text-lg border-4 border-brand-red text-brand-red bg-white rounded-xl cursor-pointer transition-all duration-300 ease-in-out hover:bg-brand-red hover:text-white"
            >
                Close
            </button>
        </div>
    );
};

export default HeadlinesContainer;
