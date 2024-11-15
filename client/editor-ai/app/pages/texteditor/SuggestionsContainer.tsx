import React, { useEffect, useState } from 'react';
import SuggestionBox from './SuggestionBox';

interface SuggestionsContainerProps {
    documentContent: string;
    setDocumentContent: (content: string) => void;
    suggestions: Array<{
        header: string;
        content: string;
        incorrectLine: string;
        correctLine: string;
    }>;
    // refreshSuggestions: boolean; // Add this prop
}

const SuggestionsContainer: React.FC<SuggestionsContainerProps> = ({
    documentContent,
    setDocumentContent,
    // refreshSuggestions, // Add this prop
    suggestions
}) => {
    return (
        <div className="bg-white rounded-lg p-4 mb-4">
            <div className="flex flex-row justify-between">
                <h1 className="font-newsreader text-2xl">Suggestions</h1>
            </div>
            <div>
                {suggestions.map((suggestion, index) => (
                    suggestion.header === "Not enough content" ? (
                        <div key={index} className="mt-4">
                            <p className="mt-2">{suggestion.content}</p>
                        </div>
                    ) : (
                        <SuggestionBox
                            key={index}
                            documentContent={documentContent}
                            setDocumentContent={setDocumentContent}
                            header={suggestion.header}
                            content={suggestion.content}
                            incorrectLine={suggestion.incorrectLine}
                            correctLine={suggestion.correctLine}
                        />
                    )
                ))}
            </div>
        </div>
    );

};

export default SuggestionsContainer;
