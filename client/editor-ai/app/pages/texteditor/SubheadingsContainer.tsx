interface SubheadingsContainerProps {
    subheadings: string | string[];
}

const SubheadingsContainer: React.FC<SubheadingsContainerProps> = ({ subheadings }) => {
    return (
        <div className="bg-white rounded-lg p-4 mb-4 relative">
            <div className="flex flex-row justify-between">
                <h2 className="font-newsreader text-2xl mb-2">Subheadings</h2>
            </div>
            {subheadings === "Select some text to generate subheadings for." || subheadings === "Selected text is too short for generating subheadings." ? (
                <p className="mt-2">{subheadings}</p>
            ) : (
                <ul className="list-disc pl-5 mb-4">
                    {(subheadings as string[]).map((subheading, index) => (
                        <li key={index} className="font-newsreader mb-1">{subheading}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SubheadingsContainer;