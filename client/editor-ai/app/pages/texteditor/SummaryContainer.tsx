interface SummaryContainerProps {
    summary: string | string[];
}

const SummaryContainer: React.FC<SummaryContainerProps> = ({ summary }) => {
    return (
        <div className="bg-white rounded-lg mb-4">
            <div className="flex flex-row justify-between mb-1">
                <h2 className="text-2xl mb-2">Summary</h2>
            </div>
            {typeof summary === "string" ? (
                <p className="mt-2">{summary}</p>
            ) : (
                <ul className="list-disc pl-5 mb-4">
                    {(summary as string[]).map((point, index) => (
                        <li key={index} className="mb-1">{point}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SummaryContainer;