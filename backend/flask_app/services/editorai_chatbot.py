from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, T5Tokenizer, T5ForConditionalGeneration
import os
import keras_nlp
from azure.identity import DefaultAzureCredential
from azure.keyvault.secrets import SecretClient

class EditorAIChatbot:
    
    def __init__(self):
        # Initialize models

        self.article_headline = ""
        self.generate_source = ""
        self.revised_article = ""

        self.model = keras_nlp.models.GemmaCausalLM.from_preset("gemma_2b_en")

        # Set environment variables
        credential = DefaultAzureCredential()
        vault_url = "https://kagglegemma.vault.azure.net"   
        secret_client = SecretClient(vault_url=vault_url, credential=credential)

        try:
           
            # Semantic Scholar API key 
            self.s2_api_key = secret_client.get_secret("s2-api-key").value

             #Kaggle  username and API key  
            self.username_secret = secret_client.get_secret("kaggle-username").value
            self.api_key_secret = secret_client.get_secret("kaggle-api-key").value

            # Set environment variables
            os.environ["KAGGLE_USERNAME"] = self.username_secret
            os.environ["KAGGLE_KEY"] = self.api_key_secret

        except Exception as e:

            print("Error:", e)
            os.environ["KAGGLE_USERNAME"] = "your_username"
            os.environ["KAGGLE_KEY"] = "your_key"

        os.environ["KERAS_BACKEND"] = "jax"
        os.environ["XLA_PYTHON_CLIENT_MEM_FRACTION"] = "0.9"

    def create_headline(self, article):
        input_text = f"Create a title for this text based on the original text. Original Text: {article}"
        outputs = self.model.generate(input_text, max_length=50, num_return_sequences=1)
        self.article_headline = outputs
        return outputs
        
        #Helper function to create description of grammar correct
    def analyze_correction(self, original, revised):

        input_text = 'Given the original sentence and its corrected version, provide a brief reason for the correction, \
            focusing on spelling and grammar. Limit the explanation to 5 words or fewer. \
                Original Sentence: [' + revised + '] and the Corrected Sentence: [' + original +'] '
        
        input_ids = self.tokenizer(input_text, return_tensors="pt").input_ids.to(self.model.device)
        outputs = self.model.generate(input_ids=input_ids, max_length=128, num_return_sequences=1)
        correction_reason = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
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
                          'ensuring that the meaning of the text remains intact. and that no additional '
                      'or inaccurate information is added. Here is the original sentence: ' + sentence)
            input_ids = self.tokenizer(input_text, return_tensors="pt").input_ids.to(self.model.device)
            outputs = self.model.generate(input_ids=input_ids, max_length=128, num_return_sequences=1)
            revised_sentence = self.tokenizer.decode(outputs[0], skip_special_tokens=True)

            #Find and add corrected reason to list
            correction_reason = self.analyze_correction(sentence, revised_sentence)
            correction_reasons.append(correction_reason)


            # Store the corrected sentences and the index of the original sentence
            corrected_sentences.append([revised_sentence,article_index])

            article_index += 1


          

        # Combine the data in a format suitable for frontend transfer
        result_data = {
            "corrected_sentences": corrected_sentences,
            "corrections_description": correction_reasons
        }
        return result_data


    #Finds the topics of the article 
    def summarize_article(self, article):
        input_text = ('Summarize the original text in two words or less,'
      'ensuring that the meaning of the text remains intact and that no additional '
            'or inaccurate information added. Here is the original text: ' + article)
        outputs = self.model.generate(input_text, max_length=10) #max length of research ai api
        return outputs
    

    # Function that uses the found topics to find scholarly articles (through API)  related to their article
    def generate_source(self, article):
        summary = self.summarize_article(article)
        #semanticscholar api
        headers = {'x-api-key': self.s2_api_key}
        #Finding articles based on topics of article
        params = {'query': summary}
        url = "https://api.semanticscholar.org/v1/paper/search"
        try:
            response = requests.get(url, params=params, headers=headers)
            response.raise_for_status()  
            papers = response.json().get("data", [])
            # Finds ONE similar resource to the user's article
            if papers:
                 first_resource = papers[0]
                 authors = first_resource.get("authors", [])
            if authors:
              first_author = authors[0]  
              self.generate_source = f"Title: {first_resource['title']}, Paper ID: {first_resource['paperId']}, Author: {first_author }"

            else: #"No author info
              self.generate_source = f"Title: {first_resource['title']}, Paper ID: {first_resource['paperId']}"

        except requests.exceptions.HTTPError as err:
            # HTTP error 
            print("Error:", err)

        except Exception as e:
            print("An error occurred:", e)

    
       
