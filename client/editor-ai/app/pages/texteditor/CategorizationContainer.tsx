import React, { useEffect, useState } from 'react';
import { updateDocumentCategory } from '../../api/document_functions';

interface CategorizationProps {
    userId: string;
    documentId: string;
    selectedCategory: string | null;
    setSelectedCategory: (category: string | null) => void;
}

const CategorizationContainer: React.FC<CategorizationProps> = ({ userId, documentId, selectedCategory, setSelectedCategory }) => {
    const [categories, setCategories] = useState<string[]>([]);
    const [localSelectedCategory, setLocalSelectedCategory] = useState<string | null>(selectedCategory);
    const [hasChanges, setHasChanges] = useState(false); // Track if there's a change

    useEffect(() => {
        const fetchedCategories = [
            "Athletics/Sports",
            "Business",
            "Opinion/Columns/Editorials",
            "Politics/City Hall/City Council",
            "Crime and Safety",
            "Transportation/Traffic",
            "Real Estate/Housing",
            "Education/Schools",
            "Food/Dining",
            "Weather",
            "Local History",
            "Activities/Events",
            "Aimed at Student Media",
            "Academic Programs/Departments",
            "Student Resources/Support",
            "Health & Wellness",
            "Career & Professional Development",
            "Community Engagement",
            "Arts & Culture",
            "Technology & Innovation"
        ];
        setCategories(fetchedCategories);
    }, []);

    const handleCategoryClick = (category: string) => {
        setLocalSelectedCategory(category);
        setHasChanges(category !== selectedCategory); // Only set hasChanges if there is an actual change
    };

    const handleSaveCategory = async () => {
        if (localSelectedCategory) {
            try {
                await updateDocumentCategory(userId, documentId, localSelectedCategory);
                setSelectedCategory(localSelectedCategory);
                setHasChanges(false);
                console.log(`Category saved as ${localSelectedCategory} for document ${documentId}`);
            } catch (error) {
                console.error('Error saving category:', error);
            }
        }
    };

    return (
        <div className="p-4">
            <h2 className="font-newsreader text-2xl mb-2">Select a Category</h2>
            {categories.map((category, index) => (
                <div
                    key={index}
                    onClick={() => handleCategoryClick(category)}
                    className={`cursor-pointer p-2 mb-2 rounded-lg transition-colors duration-300 ${
                        localSelectedCategory === category ? 'bg-brand-red text-white' : 'bg-white text-black'
                    }`}
                >
                    {category}
                </div>
            ))}
            {hasChanges && (
                <button
                    onClick={handleSaveCategory}
                    className="mt-4 px-4 py-2 bg-brand-red text-white rounded-lg transition-colors duration-300 hover:bg-red-700"
                >
                    Save
                </button>
            )}
        </div>
    );
};

export default CategorizationContainer;
