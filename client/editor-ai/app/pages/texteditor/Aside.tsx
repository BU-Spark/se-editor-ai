import React, { useState, useEffect } from 'react';

import Chatbot from './Chatbot';
import SuggestionsContainer from './SuggestionsContainer';
import SummaryContainer from './SummaryContainer';
import HeadlinesContainer from './HeadlinesContainer';
import CategorizationContainer from './CategorizationContainer';
import SubheadingsContainer from './SubheadingsContainer';

// API
import { generateSuggestion, generateSummary, generateHeadlines, generateSubheadings, generateApStyleChecking } from '@/api/handle_ai';


interface AsideProps {
    documentContent: string;
    setDocumentContent: (content: string) => void;
    selectedText: string;
}

const Aside: React.FC<AsideProps> = ({ documentContent, setDocumentContent, selectedText }) => {

    const [activeFeature, setActiveFeature] = useState<'chat' | 'grammar' | 'summary' | 'headlines' | 'subheadings' | 'categorizations' | 'AP_style'>('chat');


    const [suggestions, setSuggestions] = useState<Array<{
        header: string;
        content: string;
        incorrectLine: string;
        correctLine: string;
    }>>([]);
    const [summary, setSummary] = useState<string | string[]>('');
    const [headlines, setHeadlines] = useState<string | string[]>('');
    const [subheadings, setSubheadings] = useState<string | string[]>('');
    const [loading, setLoading] = useState(false);
    const [apStyleContent, setapStyleContent] = useState<string | string[]>('');
    useEffect(() => {
        if (activeFeature === 'subheadings' && selectedText) {
            handleCreateSubheadings();
        }
    }, [selectedText]);

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

    const handleCreateSubheadings = async () => {
        if (!selectedText) {
            setSubheadings("Select some text to generate subheadings for.");
            setLoading(false);
            return;
        }
        setLoading(true);
        const generatedSubheadings = await generateSubheadings(selectedText);
        setSubheadings(generatedSubheadings);
        setActiveFeature('subheadings');
        setLoading(false);
    };
    const handleAPStyleChecking = async () => {
        setLoading(true);
        const generatedAPStyleContent = await generateApStyleChecking(documentContent);
        setapStyleContent(generatedAPStyleContent);
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
                        setActiveFeature('AP_style');    
                        handleAPStyleChecking();
                    }}
                    className={`px-4 py-2 ${
                        activeFeature === 'AP_style' 
                            ? 'bg-brand-red text-white' 
                            : 'bg-white hover:bg-brand-red hover:text-white'
                    } rounded-lg transition-colors duration-300`}
                >
                    AP Style
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
                    onClick={() => {
                        setActiveFeature('subheadings');
                        setSubheadings('');
                        handleCreateSubheadings();
                    }}
                    className={`px-4 py-2 ${
                        activeFeature === 'subheadings' 
                            ? 'bg-brand-red text-white' 
                            : 'bg-white hover:bg-brand-red hover:text-white'
                    } rounded-lg transition-colors duration-300`}
                >
                    Subheadings
                </button>
                <button
                    onClick={() => setActiveFeature('categorizations')}
                    className={`px-4 py-2 ${activeFeature === 'categorizations' ? 'bg-brand-red text-white' : 'bg-white hover:bg-brand-red hover:text-white'} rounded-lg transition-colors duration-300`}
                >
                    Categorizations
                </button>
            </div>

            {loading && (
                <div className="flex justify-center items-center h-full">
                    <div className="loader"></div>
                </div>
            )}

            <div className="flex-grow p-4 overflow-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
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
                {activeFeature === 'AP_style' && apStyleContent && !loading && (
                    <div>{apStyleContent}</div>
                )}
                {activeFeature === 'summary' && summary && !loading && (
                    <SummaryContainer summary={summary} />
                )}
                {activeFeature === 'headlines' && headlines && !loading && (
                    <HeadlinesContainer headlines={headlines} onClose={() => setShowHeadlinesContainer(false)} />
                )}

                {activeFeature === 'subheadings' && subheadings && !loading && (
                    <SubheadingsContainer subheadings={subheadings} />
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
