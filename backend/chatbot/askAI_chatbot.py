from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, T5Tokenizer, T5ForConditionalGeneration
import os
import keras
import keras_nlp
from azure.identity import DefaultAzureCredential
from azure.keyvault.secrets import SecretClient

class AskEditorAIChatbot:
    def __init__(self):

        # Set environment variables
        credential = DefaultAzureCredential()
        vault_url = "https://kagglegemma.vault.azure.net"   
        secret_client = SecretClient(vault_url=vault_url, credential=credential)

        try:
            self.huggingface_token = secret_client.get_secret("huggingfacetoken").value

            
        except Exception as e:
            print("Error:", e)
            os.environ["HUGGINGFACE_TOKEN"] = "your_huggingfacetoken"
        try:
            self.tokenizer = LlamaTokenizer.from_pretrained("meta-llama/Meta-Llama-3-8B", huggingface_token=huggingface_token, pad_token="<pad>")
            # Add padding token
            self.tokenizer.add_special_tokens({"pad_token": "<pad>"})

            # Load model
            self.model = LlamaForCausalLM.from_pretrained("meta-llama/Meta-Llama-3-8B", huggingface_token=huggingface_token)

        except Exception as e:
            print("An error occurred while loading the model and tokenizer:", e)
        

    def respond_to_user(self, input):
        user_input = input("Tell me more... ")
        inputs = self.tokenizer(user_input, return_tensors="pt", padding="max_length", truncation=True, max_length=512)
        outputs = self.model.generate(input_ids=inputs.input_ids, attention_mask=inputs.attention_mask, max_length=75, num_return_sequences=1)
        generated_ai = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        return  generated_ai
