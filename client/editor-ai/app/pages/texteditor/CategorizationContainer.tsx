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
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [initialDocumentCategory, setInitialDocumentCategory] = useState<string | null>(null);

    useEffect(() => {
        const fetchCurrentCategory = async () => {
            if (userId && documentId) {
                try {
                    const document = await getDocument(userId, documentId);
                    if (document?.message?.Category) {
                        setLocalSelectedCategory(document.message.Category);
                        setInitialDocumentCategory(document.message.Category);
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
        setHasChanges(category !== initialDocumentCategory);
    };

    const handleSaveCategory = async () => {
        if (localSelectedCategory && userId && documentId) {
            try {
                await updateDocumentCategory(userId, documentId, localSelectedCategory);
                setHasChanges(false);
                setInitialDocumentCategory(localSelectedCategory);
                console.log(`Category saved as ${localSelectedCategory} for document ${documentId}`);
            } catch (error) {
                console.error('Error saving category:', error);
            }
        }
    };

    return (
        <div className="bg-white rounded-lg">
            <div>
                <div className="mb-4">
                    <h2 className="text-2xl">Select a Category</h2>
                </div>
                <div className="text-base mb-2">
                    {initialDocumentCategory ? (
                        `Current Category: ${initialDocumentCategory}`
                    ) : (
                        `Recommended Category: ${isRecommendationLoading ? 'Loading...' : recommendedCategory || 'None'}`
                    )}
                </div>

                <div className="relative mb-2">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 flex justify-between items-center text-brand-red"
                    >
                        <span>
                            {initialDocumentCategory ? 
                                (localSelectedCategory === initialDocumentCategory ? 'Change category' : localSelectedCategory)
                                : (localSelectedCategory || 'Select a category')
                            }
                        </span>
                        <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                            {!initialDocumentCategory && recommendedCategory && (
                                <button
                                    onClick={() => {
                                        handleCategoryClick(recommendedCategory);
                                        setIsDropdownOpen(false);
                                    }}
                                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 text-brand-red font-semibold border-b ${
                                        localSelectedCategory === recommendedCategory ? 'bg-gray-50' : ''
                                    }`}
                                >
                                    {recommendedCategory} (Recommended)
                                </button>
                            )}
                            {categories.map((category, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        handleCategoryClick(category);
                                        setIsDropdownOpen(false);
                                    }}
                                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 text-brand-red ${
                                        localSelectedCategory === category ? 'bg-gray-50' : ''
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {hasChanges && localSelectedCategory !== initialDocumentCategory && (
                    <div className="flex justify-end">
                        <button
                            onClick={handleSaveCategory}
                            className="px-4 py-2 bg-brand-red text-white rounded-lg transition-colors hover"
                        >
                            Save
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategorizationContainer;



