import React, { useEffect, useState } from 'react';
import { getDocument, updateDocumentCategory } from '../../api/document_functions';
import { useAuth } from '@/context/AuthContext';
import { useSearchParams } from 'next/navigation';
import { generateRecommendedCategory } from '../../api/handle_ai';

const CategorizationContainer: React.FC = () => {
    const { user } = useAuth();
    const userId = user?.uid as string;
    const searchParams = useSearchParams();
    const documentId = searchParams.get('documentid') || '';

    const [categories, setCategories] = useState<string[]>([
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
    ]);
    const [localSelectedCategory, setLocalSelectedCategory] = useState<string | null>(null);
    const [hasChanges, setHasChanges] = useState(false);
    const [recommendedCategory, setRecommendedCategory] = useState<string | null>(null);
    const [documentContent, setDocumentContent] = useState<string>('');
    const [isRecommendationLoading, setIsRecommendationLoading] = useState(false);

    useEffect(() => {
        const fetchCurrentCategory = async () => {
            if (userId && documentId) {
                try {
                    const document = await getDocument(userId, documentId);
                    if (document?.message?.Category) {
                        setLocalSelectedCategory(document.message.Category);
                    }
                    const content = document?.message?.Content || '';
                    setDocumentContent(content);
                } catch (error) {
                    console.error('Error fetching document category:', error);
                }
            }
        };

        fetchCurrentCategory();
    }, [userId, documentId]);

    useEffect(() => {
        const fetchRecommendedCategory = async () => {
            if (documentContent) {
                setIsRecommendationLoading(true); // Start loading
                try {
                    const category = await generateRecommendedCategory(documentContent);
                    setRecommendedCategory(category);
                } catch (error) {
                    console.error('Error generating recommended category:', error);
                    setRecommendedCategory(null);
                } finally {
                    setIsRecommendationLoading(false); // Stop loading
                }
            }
        };

        fetchRecommendedCategory();
    }, [documentContent]);

    const handleCategoryClick = (category: string) => {
        setLocalSelectedCategory(category);
        setHasChanges(category !== localSelectedCategory);
    };

    const handleSaveCategory = async () => {
        if (localSelectedCategory && userId && documentId) {
            try {
                await updateDocumentCategory(userId, documentId, localSelectedCategory);
                setHasChanges(false);
                console.log(`Category saved as ${localSelectedCategory} for document ${documentId}`);
            } catch (error) {
                console.error('Error saving category:', error);
            }
        }
    };

    return (
        <div className="p-4 overflow-y-auto">
            <h2 className="font-newsreader text-2xl mb-2">Select a Category</h2>
            <div className="font-newsreader text-xl mb-2 italic">
                Recommended Category: {isRecommendationLoading ? 'Loading...' : recommendedCategory || 'None'}
            </div>
            <div className="grid grid-cols-2 gap-2">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        onClick={() => handleCategoryClick(category)}
                        className={`flex flex-col cursor-pointer p-2 rounded-lg transition-colors font-newsreader ${
                            localSelectedCategory === category ? 'bg-brand-red text-white' : 'bg-white text-black'
                        }`}
                    >
                        {category}
                    </div>
                ))}
            </div>
            {hasChanges && (
                <button
                    onClick={handleSaveCategory}
                    className="mt-4 px-4 py-2 bg-brand-red text-white rounded-lg transition-colors hover"
                >
                    Save New Category
                </button>
            )}
        </div>
    );
};

export default CategorizationContainer;



