import React from 'react';

interface SummaryContainerProps {
    summary: string;
    onClose: () => void;
}

const SummaryContainer: React.FC<SummaryContainerProps> = ({ summary, onClose }) => {
    
    const bulletPoints = summary
        .trim() 
        .split('\n') 
        .filter(point => point.trim() !== '');

    return (
        <div className="bg-white rounded-lg p-4 mb-4">
            <div className="flex flex-row justify-between">
                <h2 className="font-newsreader text-2xl mb-2">Summary</h2>
            </div>
            <ul className="list-disc pl-5 mb-4"> 
                {bulletPoints.map((point, index) => (
                    <li key={index} className="font-newsreader mb-1">{point}</li> 
                ))}
            </ul>
        </div>
    );
};

export default SummaryContainer;
