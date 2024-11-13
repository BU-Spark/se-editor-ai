import React, { useState } from 'react';

import Chatbot from './Chatbot';
import SuggestionsContainer from './SuggestionsContainer';
import SummaryContainer from './SummaryContainer';
import HeadlinesContainer from './HeadlinesContainer';
import SubheadingsContainer from './SubheadingsContainer';

import { generateSuggestion, generateSummary, generateHeadlines } from '@/api/handle_ai';

interface AsideProps {
    documentContent: string;
    setDocumentContent: (content: string) => void;
}

const Aside: React.FC<AsideProps> = ({ documentContent, setDocumentContent }) => {
    const [activeFeature, setActiveFeature] = useState<'chat' | 'grammar' | 'summary' | 'headlines' | 
    'subheadings'>('chat');
    const [suggestions, setSuggestions] = useState<Array<{
        header: string;
        content: string;
        incorrectLine: string;
        correctLine: string;
    }>>([]);
    const [summary, setSummary] = useState<string | string[]>('');
    const [headlines, setHeadlines] = useState<string | string[]>('');
    const [loading, setLoading] = useState(false);

    const handleGrammarCheck = async () => {
        console.log('Performing Grammar/Spell Check...');
        setLoading(true);
        const newSuggestions = await generateSuggestion(documentContent);
        setSuggestions(newSuggestions || []);
        setLoading(false);
    };

    const handleSummarize = async () => {
        setLoading(true);
        const generatedSummary = await generateSummary(documentContent);
        setSummary(generatedSummary);
        setActiveFeature('summary');
        setLoading(false);
    };

    const handleCreateHeadlines = async () => {
        setLoading(true);
        const generatedHeadlines = await generateHeadlines(documentContent);
        setHeadlines(generatedHeadlines);
        setActiveFeature('headlines');
        setLoading(false);
    };

    return (
        <div className="h-screen flex flex-col bg-white rounded-lg h-full p-4">
            <div className="flex flex-justify-between gap-1 mb-4 ">
                <button
                    onClick={() => {
                        setActiveFeature('chat');
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
            </div>

            {loading && (
                <div className="flex justify-center items-center h-full">
                    <div className="loader"></div>
                </div>
            )}

            <div className="flex-grow p-4 overflow-auto">
                {activeFeature === 'chat' && !loading && (
                    <Chatbot documentContent={documentContent} />
                )}
                {activeFeature === 'grammar' && !loading && (
                    <SuggestionsContainer
                        suggestions={suggestions}
                        documentContent={documentContent}
                        setDocumentContent={setDocumentContent}
                    />
                )}
                {activeFeature === 'summary' && summary && !loading && (
                    <SummaryContainer summary={summary} />
                )}
                {activeFeature === 'headlines' && headlines && !loading && (
                    <HeadlinesContainer headlines={headlines} />
                )}
            </div>

        </div>
    );
};

export default Aside;
