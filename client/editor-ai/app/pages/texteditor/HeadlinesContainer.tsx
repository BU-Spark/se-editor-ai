interface HeadlinesContainerProps {

    headlines: string;
    onClose: () => void;
}

const HeadlinesContainer: React.FC<HeadlinesContainerProps> = ({ headlines, onClose }) => {
    // Split the headlines into an array and filter out empty lines
    const headlinesList = headlines
        .trim()
        .split('\n')
        .filter(headline => headline.trim() !== '');

    return (
        <div className="bg-white rounded-lg p-4 mb-4 relative">
            <div className="flex flex-row justify-between">
                <h2 className="font-newsreader text-2xl mb-2">Headlines</h2>
            </div>
            <ul className="list-disc pl-5 mb-4">
                {headlinesList.map((headline, index) => (
                    <li key={index} className="font-newsreader mb-1">{headline}</li>
                ))}
            </ul>

        </div>
    );
};

export default HeadlinesContainer;

