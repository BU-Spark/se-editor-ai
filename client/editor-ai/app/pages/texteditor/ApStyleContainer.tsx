import OptionButton from './Options';
interface ApStyleContainerProps {
    apStyleCheckedContent: string;
    setDocumentContent: (content: string) => void;
}

const ApStyleContainer: React.FC<ApStyleContainerProps> = ({ apStyleCheckedContent, setDocumentContent }) => {
    return (
        <div className="bg-white rounded-lg mb-4">
            <div className="flex flex-row justify-between mb-1">
                <h2 className="text-2xl mb-2">AP Style Checking</h2>
            </div>
            <p className="mt-2">{apStyleCheckedContent}</p>
            <button
                  className="close-button text-sm text-white rounded-md w-full h-8 bg-brand-red shadow-md m-1 mt-4"
                  onClick={() => setDocumentContent(apStyleCheckedContent)}
                >
                  Apply
            </button>
        </div>
    );
};

export default ApStyleContainer;