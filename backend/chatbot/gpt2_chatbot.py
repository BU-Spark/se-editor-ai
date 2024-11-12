from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
import os
import requests
from azure.identity import DefaultAzureCredential
from azure.keyvault.secrets import SecretClient
from transformers import pipeline

from transformers import LlamaForCausalLM, LlamaTokenizer



class EditorAIChatbot:
    def __init__(self):
        # Initialize models
       
        self. article_headline = ""
        self. generate_source = ""
        self. revised_article = ""
      
        # Set environment variables for Azure
        credential = DefaultAzureCredential()
        vault_url = "https://kagglegemma.vault.azure.net"
        secret_client = SecretClient(vault_url=vault_url, credential=credential)
        try:

            # Semantic Scholar API key for Generate Resources
            self.s2_api_key = secret_client.get_secret("s2-api-key").value
            self.huggingface_token = secret_client.get_secret("huggingfacetoken").value

            
        os.environ["KERAS_BACKEND"] = "jax"
        os.environ["XLA_PYTHON_CLIENT_MEM_FRACTION"] = "0.9"


        # model
        

        try:
            self.tokenizer = LlamaTokenizer.from_pretrained("meta-llama/Meta-Llama-3-8B", huggingface_token=huggingface_token, pad_token="<pad>")
            # Add padding token
            self.tokenizer.add_special_tokens({"pad_token": "<pad>"})

            # Load model
            self.model = LlamaForCausalLM.from_pretrained("meta-llama/Meta-Llama-3-8B", huggingface_token=huggingface_token)

        except Exception as e:
            print("An error occurred while loading the model and tokenizer:", e)

    #Creates a headline based on the article
    def create_headline(self, article):

      input_text = f"Create a title for this text based on the original text. Original Text: {article}"

      try:
        inputs = self.tokenizer(input_text, return_tensors="pt", padding="max_length", truncation=True, max_length=512)
        outputs = self.model.generate(input_ids=inputs.input_ids, attention_mask=inputs.attention_mask, max_length=50, num_return_sequences=1)
        generated_headline = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
      except Exception as e:
            print("An error occurred while generating the headline:", e)
            generated_headline = "Failed to generate headline"
      return generated_headline
       
    
    #Helper function to create description of grammar correct
    def analyze_correction(self, original, revised):

        input_text = ('Given the original sentence and its corrected version, provide a brief reason for the correction,' 
        'focusing on spelling and grammar. Limit the explanation to 5 words or fewer.'
                          ' Original Sentence: ['+ revised +'] and the Corrected Sentence: [' + original +'] ' )
        try:
          inputs = self.tokenizer(input_text, return_tensors="pt", padding="max_length", truncation=True, max_length=512)
          outputs = self.model.generate(input_ids=inputs.input_ids, attention_mask=inputs.attention_mask, max_length=50, num_return_sequences=1)
          correction_reason  = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        except Exception as e:
            print("An error occurred while generating the correction_reason :", e)
            generated_headline = "Failed to correction_reason "
        return correction_reason 

#Fixes the article speeling and grammar errors
    def grammar_check(self, article):

        sentences = article.split('. ')
        corrected_sentences = []
        correction_reasons = []
        #To keep track of which sentence should be replaced
        article_index = 0
        

        for sentence in sentences:
            # Prepare the input for the model
            input_text = ('Revise the original sentence to correct any grammatical and spelling errors, '
                          'ensuring that the meaning of the text remains intact and that no additional '
                      'or inaccurate information is added. If no correction is needed, just say "no correction needed". Here is the original sentence: ' + sentence)
        
             try:
              inputs = self.tokenizer(input_text, return_tensors="pt", padding="max_length", truncation=True, max_length=512)
              outputs = self.model.generate(input_ids=inputs.input_ids, attention_mask=inputs.attention_mask, max_length=50, num_return_sequences=1)
              revised_sentence  = self.tokenizer.decode(outputs[0], skip_special_tokens=True)

            except Exception as e:
              print("An error occurred while generating the correction_reason :", e)
              revised_sentence = "Failed to correction_reason "
            return revised_sentence 

            #Find and add corrected reason to list
            correction_reason = self.analyze_correction(sentence, revised_sentence)
          
             # Check if the correction reason is one of the excluded reasons
            excluded_reasons = [
                #Inputted to account for LLM inconsistencies and hallucinations.
                'No errors.',
                'No change needed.',
                'No reason provided.',
                'No changes needed.',
                'No correction needed.'
                

            ]
            if correction_reason not in excluded_reasons:
                corrected_sentences.append([revised_sentence, article_index])
                correction_reasons.append(correction_reason)

            article_index += 1

        # Combine the data in a format suitable for frontend transfer
        result_data = {
            "corrected_sentences": corrected_sentences,
            "corrections_description": correction_reasons
        }
        return result_data

    #Finds topics of the article
    def summarize_article(self, article):
        input_text = ('Summarize the original text in two words or less,'
                      'ensuring that the meaning of the text remains intact and that no additional '
                      'or inaccurate information added. Here is the original text: ' + article)
        inputs = self.tokenizer(input_text, return_tensors="pt", padding="max_length", truncation=True, max_length=512)
        outputs = self.model.generate(input_ids=inputs.input_ids, attention_mask=inputs.attention_mask, max_length=50, num_return_sequences=1)
        summary  = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        return summary

#Uses topics found to look for similar research sources
    def generate_source(self, article):
        summary = self.summarize_article(article)
        # semanticscholar api
        headers = {'x-api-key': self.s2_api_key}
        # Finding articles based on topics of article
        params = {'query': summary}
        url = "https://api.semanticscholar.org/v1/paper/search"
        try:
            response = requests.get(url, params=params, headers=headers)
            response.raise_for_status()
            papers = response.json().get("data", [])
            # Gives ONE similar resource to user
            if papers:
                first_resource = papers[0]
                authors = first_resource.get("authors", [])
                if authors:
                    first_author = authors[0]
                    self.generate_source = f"Title: {first_resource['title']}, Paper ID: {first_resource['paperId']}, Author: {first_author }"
                else:  # "No author info"
                    self.generate_source = f"Title: {first_resource['title']}, Paper ID: {first_resource['paperId']}"
        except requests.exceptions.HTTPError as err:
            # HTTP error
            print("Error:", err)
        except Exception as e:
            print("An error occurred:", e)
