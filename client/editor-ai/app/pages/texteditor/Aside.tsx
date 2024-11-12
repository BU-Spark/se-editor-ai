import React, { useState } from 'react';

// Components
import Filters from './Filters';
import Chatbot from './Chatbot';
import SuggestionsContainer from './SuggestionsContainer';
import SummaryContainer from './SummaryContainer';
import HeadlinesContainer from './HeadlinesContainer';
import CategorizationContainer from './CategorizationContainer';

// API
import { generateSuggestion, generateSummary, generateHeadlines } from '@/api/handle_ai';

interface AsideProps {
    documentContent: string;
    setDocumentContent: (content: string) => void;
}

const Aside: React.FC<AsideProps> = ({ documentContent, setDocumentContent }) => {
    const [activeFeature, setActiveFeature] = useState<'chat' | 'grammar' | 'summary' | 'headlines' | 'categorizations'>('chat');

    const [suggestions, setSuggestions] = useState<Array<{
        header: string;
        content: string;
        incorrectLine: string;
        correctLine: string;
    }>>([]);
    const [showSuggestionContainer, setShowSuggestionContainer] = useState(false);

    const [summary, setSummary] = useState<string | null>(null);
    const [headlines, setHeadlines] = useState<string | null>(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showHeadlinesContainer, setShowHeadlinesContainer] = useState(false);
    const [loading, setLoading] = useState(false);

    // Grammar/Spell Check
    const handleGrammarCheck = async () => {
        console.log('Performing Grammar/Spell Check...');
        setLoading(true);
        const newSuggestions = await generateSuggestion(documentContent);
        setSuggestions(newSuggestions || []);
        setShowSuggestions(true);
        setLoading(false);
    };

    // Summarize functionality
    const handleSummarize = async () => {
        setLoading(true);
        const generatedSummary = await generateSummary(documentContent);
        setSummary(generatedSummary);
        setActiveFeature('summary');
        setLoading(false);
    };

    // Create Headlines functionality
    const handleCreateHeadlines = async () => {
        setLoading(true);
        const generatedHeadlines = await generateHeadlines(documentContent);
        setHeadlines(generatedHeadlines);
        setShowHeadlinesContainer(true);
        setActiveFeature('headlines');
        setLoading(false);
    };

    return (
        <div className="h-screen flex flex-col bg-white rounded-lg h-full p-4">
            {/* Tab buttons */}
            <div className="flex flex-justify-between gap-1 mb-4 ">
                <button
                    onClick={() => {
                        setActiveFeature('chat');
                        setShowSuggestions(false);
                        setShowHeadlinesContainer(false);
                    }}
                    className={`px-4 py-2 ${
                        activeFeature === 'chat' 
                            ? 'bg-brand-red text-white' 
                            : 'bg-white hover:bg-brand-red hover:text-white'
                    } rounded-lg transition-colors duration-300`}
                >
                    Chat

                </button>
                <button
                    onClick={() => {
                        setActiveFeature('grammar');
                        setShowSuggestions(false);
                        setShowHeadlinesContainer(false);
                        handleGrammarCheck();
                    }}
                    className={`px-4 py-2 ${
                        activeFeature === 'grammar' 
                            ? 'bg-brand-red text-white' 
                            : 'bg-white hover:bg-brand-red hover:text-white'
                    } rounded-lg transition-colors duration-300`}
                >
                    Grammar
                </button>
                <button
                    onClick={() => {
                        setActiveFeature('summary');
                        if (!summary) {
                            handleSummarize();
                        }
                    }}
                    className={`px-4 py-2 ${
                        activeFeature === 'summary' 
                            ? 'bg-brand-red text-white' 
                            : 'bg-white hover:bg-brand-red hover:text-white'
                    } rounded-lg transition-colors duration-300`}
                >
                    Summary
                </button>
                <button
                    onClick={() => {
                        setActiveFeature('headlines');
                        if (!headlines) {
                            handleCreateHeadlines();
                        }
                    }}
                    className={`px-4 py-2 ${
                        activeFeature === 'headlines' 
                            ? 'bg-brand-red text-white' 
                            : 'bg-white hover:bg-brand-red hover:text-white'
                    } rounded-lg transition-colors duration-300`}
                >
                    Headlines
                </button>
                <button
                    onClick={() => setActiveFeature('categorizations')}
                    className={`px-4 py-2 ${activeFeature === 'categorizations' ? 'bg-brand-red text-white' : 'bg-white hover:bg-brand-red hover:text-white'} rounded-lg transition-colors duration-300`}
                >
                    Categorizations
                </button>
            </div>

            {/* Loader */}
            {loading && (
                <div className="flex justify-center items-center h-full">
                    <div className="loader"></div>
                </div>
            )}

            {/* Display of active feature */}
            <div className="flex-grow p-4 overflow-auto">
                {activeFeature === 'chat' && !loading && (
                    <Chatbot documentContent={documentContent} />
                )}

                {/* Grammar/Spell Check Feature */}
                {activeFeature === 'grammar' && !loading && (
                    <SuggestionsContainer
                        setShowSuggestionContainer={() => setShowSuggestions(false)}
                        suggestions={suggestions}
                        documentContent={documentContent}
                        setDocumentContent={setDocumentContent}
                    />
                )}

                {/* Summary Feature */}
                {activeFeature === 'summary' && summary && !loading && (
                    <SummaryContainer summary={summary} onClose={() => setSummary(null)} />
                )}

                {/* Headlines Feature */}
                {activeFeature === 'headlines' && headlines && !loading && (
                    <HeadlinesContainer headlines={headlines} onClose={() => setShowHeadlinesContainer(false)} />
                )}

                {/* Categorization Feature */}
                {activeFeature === 'categorizations' && !loading && (
                    <CategorizationContainer />
                )}
            </div>

        </div>
    );
};

export default Aside;
