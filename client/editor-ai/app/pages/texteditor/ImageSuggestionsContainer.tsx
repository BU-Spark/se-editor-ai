interface ImageSuggestionsContainerProps {
    imageSuggestions: string | Array<{url: string; source: string}>;
}

const ImageSuggestionsContainer: React.FC<ImageSuggestionsContainerProps> = ({ imageSuggestions }) => {
    return (
        <div className="bg-white rounded-lg mb-4 relative">
            <div className="flex flex-row justify-between mb-1">
                <h2 className="text-2xl mb-2">Image Suggestions</h2>
            </div>
            {typeof imageSuggestions === "string" ? (
                <p className="mt-2">{imageSuggestions}</p>
            ) : (
                <>
                    {imageSuggestions.length === 0 ? (
                        <div>There was an error fetching images.</div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            {imageSuggestions.map((suggestion, index) => (
                                <div key={index} className="relative">
                                    <img 
                                        src={suggestion.url} 
                                        alt={`Image suggestion ${index + 1}"`}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                    <p className="text-sm text-gray-600 mt-1">Source: {suggestion.source}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ImageSuggestionsContainer;