import os
import requests
from azure.identity import DefaultAzureCredential
from azure.keyvault.secrets import SecretClient
from transformers import LlamaForCausalLM, LlamaTokenizer
import webbrowser



class PromoteBot:
  def __init__(self, social_media_option_button, text):
        # Initialize models
     

        self.smbuttton = social_media_option_button.lower() 
        self.article = text

        credential = DefaultAzureCredential()
        vault_url = "https://kagglegemma.vault.azure.net"
        secret_client = SecretClient(vault_url=vault_url, credential=credential)
        try:
            
            self.huggingface_token = secret_client.get_secret("huggingfacetoken").value
        except Exception as e:
            print("An error occurred while loading Azure Secrets:", e)
  


        #META Llama3 model
        
        try:
            self.tokenizer = LlamaTokenizer.from_pretrained("meta-llama/Meta-Llama-3-8B", huggingface_token=self.huggingface_token, pad_token="<pad>")
            self.tokenizer.add_special_tokens({"pad_token": "<pad>"})
            self.model = LlamaForCausalLM.from_pretrained("meta-llama/Meta-Llama-3-8B", huggingface_token=self.huggingface_token)

        except Exception as e:
            print("An error occurred while loading the model and tokenizer:", e)


        #Social media copy
        self.smc = ""

         
  def create_social_media_copy(self):
        input_text = f"Craft a social media transcript with a maximum of 280 characters for this article that is both engaging, with emojis and Emphasizes the core message of the article, Keep the tone positive and relatable. The Article: {self.article}"
        try:
            inputs = self.tokenizer(input_text, return_tensors="pt", padding="max_length", truncation=True, max_length=512)
            outputs = self.model.generate(input_ids=inputs.input_ids, attention_mask=inputs.attention_mask, max_length=50, num_return_sequences=1)
            copy_text = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        except Exception as e:
            print("An error occurred while generating the copy text:", e)
            copy_text = "Failed to generate social media copy text"
        self.smc = copy_text
        return copy_text
        
    # Taking the user to  the social media website ( NEED Tokens for original social media routes [POST])
  def post_to_facebook(self ):
        facebook_login_url = "https://www.facebook.com/login.php"
        webbrowser.open(facebook_login_url)
        


  def post_to_twitter(self):
        twitter_login_url = "https://twitter.com/login"
        webbrowser.open(twitter_login_url)
