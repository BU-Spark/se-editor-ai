import { useState } from 'react';
import { textGeneration, HfInference } from '@huggingface/inference';

const hfToken = process.env.NEXT_PUBLIC_HF_ACCESS_TOKEN;
const modelName = 'mistralai/Mistral-7B-Instruct-v0.2';
const context = "You're editorai an AI bot designed to help hyperlocal journalist improve their writing. Journalists will ask your questions on general topics and how to improve their article. Please limit your response to 1-2 sentences if possible";

export const generateAnswer = async (question: string, context: string): Promise<string | null> => {
  const inputText = `context: ${context} question: ${question}\ncontext: ${context} answer:`;

  const res = await textGeneration({
    accessToken: hfToken,
    model: modelName,
    inputs: inputText,
    parameters: {
        max_new_tokens: 2000,
        return_full_text:false    
    },
  });

  const generatedText = res.generated_text;
  console.log('Generated text:', generatedText);

  return generatedText;
};

export const generateSuggestion = async (documentContent: string): Promise<Array<{ header: string; content: string; incorrectLine: string; correctLine: string }> | null> => {
    if (documentContent.length < 20) {
        return [{ 
            header: "Not enough content", 
            content: "No suggestions available. Write something first.", 
            incorrectLine: "", 
            correctLine: "" 
        }];
    }
    const question = 'Please provide 3-4 grammar suggestions for improving the following text. For each suggestion, include the incorrect line, the corrected line, and a brief explanation. Format your response as a JSON array, where each suggestion is an object with "header", "content", "incorrectLine", and "correctLine" properties.';
    const inputText = `context: ${context} question: ${question}\ndocument: ${documentContent}\nsuggestions:`;
  
    const res = await textGeneration({
      accessToken: hfToken,
      model: modelName,
      inputs: inputText,
      parameters: {
        max_new_tokens: 2000,
        return_full_text: false    
      },
    });
  
    const generatedText = res.generated_text;
  
    try {
      // Remove the "Generated text:" label if present
      const jsonString = generatedText.replace(/^Generated text:\s*/, '');
  
      // Parse the JSON string into a JavaScript object
      const suggestions = JSON.parse(jsonString);
  
      console.log('Generated suggestions:', suggestions);
  
      return suggestions;
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return null;
    }
  }

  export const generateSummary = async (documentContent: string): Promise<string | string[]> => {
    if (documentContent.length < 20) {
        return "No summary available. Write something first.";
    }
    const question = 'Extract 5 key points from this text. Each point should be a direct and concise sentence. Present each point on a new line.';
    const inputText = `context: ${context} question: ${question}\ndocument: ${documentContent}\nsummary:`;

    const res = await textGeneration({
        accessToken: hfToken,
        model: modelName,
        inputs: inputText,
        parameters: {
            max_new_tokens: 500,
            return_full_text: false    
        },
    });

    const generatedText = res.generated_text;
    console.log('Generated summary:', generatedText);

    const summary = generatedText
        .replace(/^Generated text:\s*/, '') // remove any "Generated text:" prefix
        .split('\n')
        .map(line => line.trim()
            .replace(/^\d+\.\s*/gm, '') // Remove leading numbers and dots
            .replace(/\.$/, '') // Remove trailing periods
        )
        .filter(Boolean); // Remove empty lines
        
    return summary;
};

  export const generateHeadlines = async (documentContent: string): Promise<string | string[]> => {
    if (documentContent.length < 20) {
        return "No headlines available. Write something first.";
    }
    const question = 'Extract 5 headline options from this text. Each headline should be 5-10 words and capture the main point. Present each option on a new line.';
    const inputText = `context: ${context} question: ${question}\ndocument: ${documentContent}\nheadlines:`;

    const res = await textGeneration({
        accessToken: hfToken,
        model: modelName,
        inputs: inputText,
        parameters: {
            max_new_tokens: 300,
            return_full_text: false,
            temperature: 0.7
        },
    });

    const generatedText = res.generated_text;
    console.log('Generated headlines:', generatedText);

    const headlines = generatedText
        .replace(/^Generated text:\s*/, '') // remove any "Generated text:" prefix
        .split('\n')
        .map(line => line.trim()
            .replace(/^\d+\.\s*/gm, '') // Remove leading numbers and dots
            .replace(/\.$/, '') // Remove trailing periods
        )
        .filter(Boolean); // Remove empty lines

    return headlines;
  };

  export const generateSubheadings = async (selectedText: string): Promise<string | string[]> => {
    if (!selectedText) {
      return "Select some text to generate subheadings for.";
    }
    if (selectedText.length < 100) {
      return "Selected text is too short for generating subheadings.";
    }
    const question = 'Extract 5 subheading options from this text. Each subheading should be 5-10 words and capture the main point. Present each option on a new line.';
    const inputText = `context: ${context} question: ${question}\ndocument: ${selectedText}\nsubheadings:`;

    const res = await textGeneration({
        accessToken: hfToken,
        model: modelName,
        inputs: inputText,
        parameters: {
            max_new_tokens: 300,
            return_full_text: false,
            temperature: 0.7
        },
    });

    const generatedText = res.generated_text;
    console.log('Generated subheadings:', generatedText);

    const subheadings = generatedText
        .replace(/^Generated text:\s*/, '') // remove any "Generated text:" prefix
        .split('\n')
        .map(line => line.trim()
            .replace(/^\d+\.\s*/gm, '') // Remove leading numbers and dots
            .replace(/\.$/, '') // Remove trailing periods
        )
        .filter(Boolean); // Remove empty lines

    return subheadings;
  };

  export const generateSocialMediaCopy = async (document:string): Promise<string | null> => {
    const randomSeed = Math.random().toString(36).substring(7);
    const inputText = `
      You're a social media manager and you're in charge of turning this piece of 
      content into a social media post for a hyperlocal news outlet.
      Please write a caption that is engaging and informative.
      The caption should be no more than 280 characters and include hashtags.
      document: ${document}
      random_seed: ${randomSeed}  
      social_media_copy:
    `;
  
    const res = await textGeneration({
      accessToken: hfToken,
      model: modelName,
      inputs: inputText,
      parameters: {
          max_new_tokens: 200,
          return_full_text:false,
          temperature: 0.7 
      },
    });
  
    const generatedText = res.generated_text;
  
    console.log('Generated text:', generatedText);
  
    return generatedText;
  };

