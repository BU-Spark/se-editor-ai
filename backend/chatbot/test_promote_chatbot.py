import pytest
from unittest.mock import patch, MagicMock
from promote_chatbot import PromoteBot

@pytest.fixture
def promote_bot():
    return PromoteBot("Facebook", "This is a test article. It contains multiple sentences. Each sentence will be analyzed separately.Some sentences may contain grammatical errors or misspellings that need correction. The article should be summarized succinctly. ")

@patch('promote_chatbot.PromoteBot.create_social_media_copy')

def test_create_social_media_copy(mock_create_social_media_copy, promote_bot):
    # Mocking the return value of create_social_media_copy method
    mock_create_social_media_copy.return_value = "Generated SM copy"
    copy_text = promote_bot.create_social_media_copy()
    assert copy_text == "Generated SM copy"


@patch('my_module.webbrowser.open')
def test_post_to_facebook(mock_webbrowser_open, promote_bot):
    promote_bot.post_to_facebook()
    mock_webbrowser_open.assert_called_once_with("https://www.facebook.com/login.php")

@patch('my_module.webbrowser.open')
def test_post_to_twitter(mock_webbrowser_open, promote_bot):
    promote_bot.post_to_twitter()
    mock_webbrowser_open.assert_called_once_with("https://twitter.com/login")
