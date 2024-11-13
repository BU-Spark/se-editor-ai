interface HeadlinesContainerProps {
    headlines: string | string[];
}

const HeadlinesContainer: React.FC<HeadlinesContainerProps> = ({ headlines }) => {
    return (
        <div className="bg-white rounded-lg p-4 mb-4 relative">
            <div className="flex flex-row justify-between">
                <h2 className="font-newsreader text-2xl mb-2">Headlines</h2>
            </div>
            {typeof headlines === "string" ? (
                <p className="mt-2">{headlines}</p>
            ) : (
                <ul className="list-disc pl-5 mb-4">
                    {(headlines as string[]).map((headline, index) => (
                        <li key={index} className="font-newsreader mb-1">{headline}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default HeadlinesContainer;

