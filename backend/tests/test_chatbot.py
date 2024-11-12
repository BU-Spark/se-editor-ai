import pytest
from chatbot import EditorAIChatbot

@pytest.fixture
def chatbot():
    return EditorAIChatbot()

def test_create_headline(chatbot):
    # Test the create_headline method
    article = "This is a test article. It contains multiple sentences. Each sentence will be analyzed separately. Some sentences may contain grammatical errors or misspellings that need correction. The article should be summarized succinctly. "
    headline = chatbot.create_headline(article)
    assert isinstance(headline, str)

def test_analyze_correction(chatbot):
    # Test the analyze_correction method
    original = "Me and he plays basketball at the park yesterday."
    revised = "He and I played basketball at the park yesterday."
    correction_reason = chatbot.analyze_correction(original, revised)
    assert isinstance(correction_reason, str)

def test_grammar_check(chatbot):
    # Test the grammar_check method
    article = "This is a test article. It contains multiple sentences. Each sentence will be analyzed separately.Some sentences may contain grammatical errors or misspellings that need correction. The article should be summarized succinctly. "
    revised_article = chatbot.grammar_check(article)
    assert isinstance(revised_article, str)

def test_summarize_article(chatbot):
    # Test the summarize_article method
    article = "This is a test article. It contains multiple sentences. Each sentence will be analyzed separately.Some sentences may contain grammatical errors or misspellings that need correction. The article should be summarized succinctly. "
    summary = chatbot.summarize_article(article)
    assert isinstance(summary, str)

def test_generate_source(chatbot):
    # Test the generate_source method
    article = "This is a test article. It contains multiple sentences. Each sentence will be analyzed separately.Some sentences may contain grammatical errors or misspellings that need correction. The article should be summarized succinctly. "
    chatbot.generate_source(article)
    assert isinstance(chatbot.generate_source, str)
