interface SubheadingsContainerProps {
    subheadings: string | string[];
}

const SubheadingsContainer: React.FC<SubheadingsContainerProps> = ({ subheadings }) => {
    return (
        <div className="bg-white rounded-lg first-letter:mb-4 relative">
            <div className="flex flex-row justify-between mb-1">
                <h2 className="text-2xl mb-2">Subheadings</h2>
            </div>
            {subheadings === "Select some text to generate subheadings for." || subheadings === "Selected text is too short for generating subheadings." ? (
                <p className="mt-2">{subheadings}</p>
            ) : (
                <ul className="list-disc pl-5 mb-4">
                    {(subheadings as string[]).map((subheading, index) => (
                        <li key={index} className="mb-1">{subheading}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SubheadingsContainer;