import React, { useState, useEffect } from 'react';

import Chatbot from './Chatbot';
import SuggestionsContainer from './SuggestionsContainer';
import SummaryContainer from './SummaryContainer';
import HeadlinesContainer from './HeadlinesContainer';
import CategorizationContainer from './CategorizationContainer';
import SubheadingsContainer from './SubheadingsContainer';

import { generateSuggestion, generateSummary, generateHeadlines, generateSubheadings, generateApStyleChecking } from '@/api/handle_ai';
import ApStyleContainer from './ApStyleContainer';

interface AsideProps {
    documentContent: string;
    setDocumentContent: (content: string) => void;
    selectedText: string;
}

const Aside: React.FC<AsideProps> = ({ documentContent, setDocumentContent, selectedText }) => {

    const [activeFeature, setActiveFeature] = useState<'AP Style' | 'chat' | 'grammar' | 'summary' | 'headlines' | 'subheadings' | 'categorization'>('chat');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    const [apStyleContent, setapStyleContent] = useState<string>('');
    
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
        setActiveFeature('AP Style');
        setLoading(false);
    };
    return (
        <div className="h-screen flex flex-col bg-white h-full p-3">
            <div className="relative mb-4">
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 flex justify-between items-center"
                >
                    <span>{activeFeature.charAt(0).toUpperCase() + activeFeature.slice(1)}</span>
                    <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isDropdownOpen && (
                    <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-10">
                        <button
                            onClick={() => {
                                setActiveFeature('AP Style');
                                handleAPStyleChecking();
                                setIsDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left hover:bg-gray-50"
                        >
                            AP Style
                        </button>
                        <button
                            onClick={() => {
                                setActiveFeature('chat');
                                setIsDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left hover:bg-gray-50"
                        >
                            Chat
                        </button>
                        <button
                            onClick={() => {
                                setActiveFeature('grammar');
                                handleGrammarCheck();
                                setIsDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left hover:bg-gray-50"
                        >
                            Grammar
                        </button>
                        <button
                            onClick={() => {
                                setActiveFeature('summary');
                                if (!summary) handleSummarize();
                                setIsDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left hover:bg-gray-50"
                        >
                            Summary
                        </button>
                        <button
                            onClick={() => {
                                setActiveFeature('headlines');
                                if (!headlines) handleCreateHeadlines();
                                setIsDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left hover:bg-gray-50"
                        >
                            Headlines
                        </button>
                        <button
                            onClick={() => {
                                setActiveFeature('subheadings');
                                setSubheadings('');
                                handleCreateSubheadings();
                                setIsDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left hover:bg-gray-50"
                        >
                            Subheadings
                        </button>
                        <button
                            onClick={() => {
                                setActiveFeature('categorization');
                                setIsDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left hover:bg-gray-50"
                        >
                            Categorization
                        </button>
                    </div>
                )}
            </div>

            {loading && (
                <div className="flex justify-center items-center h-full">
                    <div className="loader"></div>
                </div>
            )}

            <div className="flex-grow p-2 overflow-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                {activeFeature === 'AP Style' && apStyleContent && !loading && (
                    // <div>{apStyleContent}</div>
                    <ApStyleContainer apStyleCheckedContent={apStyleContent} setDocumentContent={setDocumentContent}/>
                )}
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
                {activeFeature === 'subheadings' && subheadings && !loading && (
                    <SubheadingsContainer subheadings={subheadings} />
                )}
                {activeFeature === 'categorization' && !loading && (
                    <CategorizationContainer />
                )}
            </div>

        </div>
    );
};

export default Aside;