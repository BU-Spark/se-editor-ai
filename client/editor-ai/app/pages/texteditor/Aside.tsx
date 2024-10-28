import React, { useState } from 'react';

// Components
import Filters from './Filters';
import Chatbot from './Chatbot';
import SuggestionsContainer from './SuggestionsContainer';
import SummaryContainer from './SummaryContainer';
import HeadlinesContainer from './HeadlinesContainer';

// API
import { generateSuggestion, generateSummary, generateHeadlines } from '@/api/handle_ai';


interface AsideProps {
    documentContent: string;
    setDocumentContent: (content: string) => void;
}

const Aside: React.FC<AsideProps> = ({ documentContent, setDocumentContent }) => {
    const [showFilters, setShowFilters] = useState(true);
    const [showChatbot, setShowChatbot] = useState(true);
    const [activeOption, setActiveOption] = useState<string | null>(null);

    const [suggestions, setSuggestions] = useState<Array<{
        header: string;
        content: string;
        incorrectLine: string;
        correctLine: string;
    }>>([]);
    const [showSuggestionContainer, setShowSuggestionContainer] = useState(false);

    const [summary, setSummary] = useState<string | null>(null);
    const [showSummaryContainer, setShowSummaryContainer] = useState(false);

    const [headlines, setHeadlines] = useState<string | null>(null);
    const [showHeadlinesContainer, setShowHeadlinesContainer] = useState(false);


    const handleGrammarCheck = async () => {
        console.log('Performing Grammar/Spell Check...');
        const newSuggestions = await generateSuggestion(documentContent);
        setSuggestions(newSuggestions || []);
        setShowSuggestionContainer(!!newSuggestions);
        setShowFilters(false);
        setShowSummaryContainer(false);
        setSummary(null);
        setHeadlines(null);
        setShowHeadlinesContainer(false);
    };

    const handleSummarize = async () => {
        console.log('Generating Summary...');
        const generatedSummary = await generateSummary(documentContent);
        setSummary(generatedSummary);
        setShowSummaryContainer(!!generatedSummary);
        setActiveOption(generatedSummary ? 'summary' : null);
        setShowSuggestionContainer(false);
        setSuggestions([]);
        setShowFilters(false);
        setHeadlines(null);
        setShowHeadlinesContainer(false);
    };

    const handleCreateHeadlines = async () => {
        console.log('Creating Headlines and Subheadings...');
        const generatedHeadlines = await generateHeadlines(documentContent);
        setHeadlines(generatedHeadlines);
        setShowHeadlinesContainer(true);
        setShowSuggestionContainer(false);
        setSuggestions([]);
        setShowFilters(false);
        setShowSummaryContainer(false);
        setSummary(null);
    };

    const handleOptionClick = (option: string) => {
        setActiveOption(option);
        if (option === 'filters') {
            setShowFilters(true);
            setShowSuggestionContainer(suggestions.length > 0);
        } else if (option === 'suggestions') {
            setShowFilters(false);
            setShowSuggestionContainer(suggestions.length > 0);
        } else if (option === 'chatbot') {
            setShowChatbot(!showChatbot);
        }
    };

    return (
        <div className='flex flex-col flex-grow ml-5 p-4' style={{ flexBasis: '30%' }}>
            {showFilters ? (
                <Filters 
                    documentContent={documentContent} 
                    setShowOptions={() => handleOptionClick('filters')} 
                    setShowAskAI={() => handleOptionClick('chatbot')} 
                    setShowSuggestions={() => handleOptionClick('suggestions')} 
                    onGrammarCheck={handleGrammarCheck}
                    onCreateHeadlines={handleCreateHeadlines}
                    onSummarize={handleSummarize}
                />
            ) : (
                <button onClick={() => handleOptionClick('filters')} className="shadow-md mb-4 px-6 py-1 text-lg border-4 border-brand-red text-brand-red bg-white rounded-xl cursor-pointer transition-all duration-300 ease-in-out hover:bg-brand-red hover:text-white">
                    Show Options
                </button>
            )}

            {suggestions.length > 0 && (
                showSuggestionContainer ? (
                    <SuggestionsContainer 
                        setShowSuggestionContainer={() => setShowSuggestionContainer(false)} 
                        suggestions={suggestions} 
                        documentContent={documentContent} 
                        setDocumentContent={setDocumentContent} 
                    />
                ) : (
                    <button onClick={() => setShowSuggestionContainer(true)} className="shadow-md mb-4 px-6 py-1 text-lg border-4 border-brand-red text-brand-red bg-white rounded-xl cursor-pointer transition-all duration-300 ease-in-out hover:bg-brand-red hover:text-white">
                        Suggestions
                    </button>
                )
            )}

            {summary && (
                showSummaryContainer ? (
                    <SummaryContainer 
                        summary={summary} 
                        onClose={() => setShowSummaryContainer(false)}
                    />
                ) : (
                    <button onClick={() => setShowSummaryContainer(true)} className="shadow-md mb-4 px-6 py-1 text-lg border-4 border-brand-red text-brand-red bg-white rounded-xl cursor-pointer transition-all duration-300 ease-in-out hover:bg-brand-red hover:text-white">
                        Show Summary
                    </button>
                )
            )}

            {headlines && (
                showHeadlinesContainer ? (
                    <HeadlinesContainer 
                        headlines={headlines} 
                        onClose={() => setShowHeadlinesContainer(false)}
                    />
                ) : (
                    <button onClick={() => setShowHeadlinesContainer(true)} className="shadow-md mb-4 px-6 py-1 text-lg border-4 border-brand-red text-brand-red bg-white rounded-xl cursor-pointer transition-all duration-300 ease-in-out hover:bg-brand-red hover:text-white">
                        Show Headlines & Subheadings
                    </button>
                )
            )}

            {showChatbot ? (
                <Chatbot setShowAskAI={() => handleOptionClick('chatbot')} documentContent={documentContent} />
            ) : (
                <button onClick={() => handleOptionClick('chatbot')} className="shadow-md mb-4 px-6 py-1 text-lg border-4 border-brand-red text-brand-red bg-white rounded-xl cursor-pointer transition-all duration-300 ease-in-out hover:bg-brand-red hover:text-white">
                    Ask EditorAI
                </button>
            )}
        </div>
    );
};

export default Aside;
