from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, T5Tokenizer, T5ForConditionalGeneration
import os
import keras_nlp
from azure.identity import DefaultAzureCredential
from azure.keyvault.secrets import SecretClient
import requests


class PromoteBot:

    def __init__(self):
        # Initialize models

        self.copy_model = keras_nlp.models.GemmaCausalLM.from_preset("gemma_2b_en")

        # Set environment variables
         # Set environment variables
        credential = DefaultAzureCredential()
        vault_url = "https://kagglegemma.vault.azure.net"  # Update with your Key Vault URL
        secret_client = SecretClient(vault_url=vault_url, credential=credential)
        
        #Social media copy 
        self.smc = "" 

        try:
            # Get username and API key from Key Vault secrets
            username_secret = secret_client.get_secret("Username").value
            api_key_secret = secret_client.get_secret("Key").value

            # Set environment variables
            os.environ["KAGGLE_USERNAME"] = username_secret
            os.environ["KAGGLE_KEY"] = api_key_secret
        except Exception as e:
            print("Error:", e)
            os.environ["KAGGLE_USERNAME"] = "your_username"
            os.environ["KAGGLE_KEY"] = "your_key"

        os.environ["KERAS_BACKEND"] = "jax"
        os.environ["XLA_PYTHON_CLIENT_MEM_FRACTION"] = "0.9"


    def create_social_media_copy(self, article):
        input_text = f"Craft a social media transcript for the following text that is both engaging, with emojis and Emphasizes the core message of the article, Keep the tone positive and relatable. : {article}"
        social_media_copy = self.copy_model.generate(input_text, max_length=300)
        return social_media_copy
       

    # Posting the social media copy to SM NEED Spark Tokens for social medai routes
    def post_to_facebook(self, social_media_copy: str) -> "tuple[bool, str]":
        # Facebook API 
        url = "https://graph.facebook.com/v12.0/me/feed"

        #Access Token 
        fb_access_token = "ACCESS_TOKEN_HERE"

        params = {
            "access_token": fb_access_token,
            "message": social_media_copy
        }

        try:
            # Send POST / Facebook API 
            response = requests.post(url, params=params)
            response.raise_for_status()  
            post_id = response.json().get("id")
            return True, post_id
        
        except requests.exceptions.HTTPError as err:
            # HTTP error 
            return False, str(err)

        except Exception as err:
            # Other errors 
            return False, str(err)


    def post_to_twitter(self, social_media_copy: str) -> "tuple[bool, str]":

        # Twitter API 
        url = "https://api.twitter.com/2/tweets"

        # NEED TOKEN
        access_token = "YOUR_OAUTH_ACCESS_TOKEN_HERE"
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }

        # JSON body 
        tweet_body = {
            "text": social_media_copy
        }

        try:
            # Send POST request to Twitter API to create a tweet
            response = requests.post(url, headers=headers, json=tweet_body)
            response.raise_for_status()  # 

            tweet_data = response.json()["data"]
            tweet_id = tweet_data["id"]
            tweet_text = tweet_data["text"]

            print("this is tweet_text", tweet_text) # for testing

            return True, tweet_id
        
        except requests.exceptions.HTTPError as err:
            # HTTP error  
            return False, err

        except Exception as err:
            # Other errors  
            return False, err

    # IN THE FUTURE 
        # def conversational_style(self, article):
        #     input_text = (
        #         'Revise the original text to enhance its conversational and engaging tone '
        #         'while maintaining its original meaning. Ensure that the meaning of the '
        #         'text remains intact and that no additional or inaccurate information '
        #         'is added. Here is the original text: ' + article
        #     )
        #     outputs = self.model.generate(input_text, max_length=500)
        #     return outputs

        # def data_driven_style(self, article):
        #     input_text = (
        #         'Revise the original text to enhance its emphasis on the data provided '
        #         'in the original text, making it data-driven and analytical in its '
        #         'approach to interpreting the data within the context of the article\'s main points. '
        #         'Ensure that the meaning of the text remains intact and that no additional '
        #         'or inaccurate information is added. Here is the original text: ' + article
        #     )
        #     outputs = self.model.generate(input_text, max_length=500)
        #     return outputs   

        # def make_stylistic_changes(self, article_text):
        #     print("Stylistic options:")
        #     print("1: Conversational and Engaging")
        #     print("2: Data-driven and Analytical")

        #     choice = input("Enter your choice: ")

        #     if choice == "1":
        #         article = self.conversational_style(article_text)
        #         social_copy = self.create_social_media_copy(article)
        #         self.smc = social_media_copy
                
        #     elif choice == "2":
        #         article = self.data_driven_style(article_text)
        #         return  social_copy = self.create_social_media_copy(article)
        #         self.smc = social_media_copy

        #     else:
        #         return "Invalid choice. Please try again."
