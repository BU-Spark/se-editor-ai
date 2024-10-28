import React, { useState } from 'react';
import OptionButton from './Options';

interface FiltersProps {
    documentContent: string;
    setShowOptions: (showOptions: boolean) => void;
    setShowAskAI: (showAskAI: boolean) => void;
    setShowSuggestions: (showSuggestions: boolean) => void;
    onGrammarCheck: () => void;
    onSummarize: () => void;
    onCreateHeadlines: () => void;
}

const Filters: React.FC<FiltersProps> = ({
    documentContent,
    setShowOptions,
    setShowAskAI,
    setShowSuggestions,
    onGrammarCheck,
    onCreateHeadlines,
    onSummarize
}) => {
    const [showFilters, setShowFilters] = useState(true);

    const handleToggleFilters = () => {
        setShowFilters(!showFilters);
    };

    return (
        <div className='flex-grow mr-5 p-5 pb-5' style={{ flexBasis: '30%' }}>
            <p className='mt-8 mb-2 text-2xl font-newsreader text-center'>I need help with:</p>
            {showFilters ? (
                <div className="button-container flex flex-col items-center">
                    <OptionButton text="Grammar/Spell Check" onClick={onGrammarCheck} />
                    <OptionButton text="Summarize" onClick={onSummarize} />
                    <OptionButton text="Create Headlines" onClick={onCreateHeadlines} />
                </div>
            ) : (
                <div className="flex justify-center mt-4">
                    <button onClick={handleToggleFilters} className="button-container bg-blue-500 font-poppins custom-border border-4 px-4 py-2 bg-brand-red text-white rounded-r shadow-md">
                        Show Filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default Filters;
