import React, { useState } from 'react';
import { generateAnswer } from '../../api/handle_ai';

interface ChatbotProps {
    setShowAskAI: (setShowAskAI: boolean) => void;
    documentContent: string;
};

interface Message {
  id: number;
  author: string;
  text: string;
}

const Chatbot = ({setShowAskAI,documentContent}:ChatbotProps) => {
  const [messages, setMessages] = useState([
    { id: 1, author:"editorai",text: "Hi there! I'm EditorAI. How can I assist you today?" },
  ]);
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;
    const newMessage = { id: messages.length + 1, author:'user',text: inputText };
    setMessages([...messages, newMessage]);
    setInputText('');
  
    // Generate answer using the LLM
    const context = 'This is the document the user is asking about for context: ' + documentContent;
    const answer = await generateAnswer(inputText, context);
    const answerText = answer || "Sorry, I couldn't generate a response.";

    // Add the generated answer to the messages
    const answerMessage: Message = { id: messages.length + 2, author: 'editorai', text: answerText };
    setMessages([...messages, newMessage, answerMessage]);
    
  };

  const handleResetConversation = () => {
    setMessages([
      { id: 1, author:"editorai",text: "Hi there! I'm EditorAI. How can I assist you today?" },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-15rem)]  flex flex-col bg-white rounded-xl">
      <div className="flex flex-row justify-between mb-6">
                <h2 className="text-2xl">Ask EditorAI</h2>
            </div>
      {messages.length > 10 && <button onClick={handleResetConversation}> Reset</button>}
      
      {/* Chat messages container */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((message) => (
          message.author === 'editorai' 
          ? (
            <div key={message.id} className="flex justify-start">
              <div className="p-2 bg-brand-tan rounded-xl shadow text-brand-red max-w-[80%]">
                {message.text}
              </div>
            </div>
          ) : (
            <div key={message.id} className="flex justify-end">
              <div className="p-2 bg-brand-red text-white rounded-xl shadow max-w-[80%]">
                {message.text}
              </div>
            </div>
          )
        ))}
      </div>
  
      {/* Input field fixed to the bottom */}
      <div className="sticky bottom-0 flex border-brand-red border-2 rounded-xl items-center shadow-md bg-white">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputText}
          onChange={handleInputChange}
          className="flex-1 p-2 rounded-xl h-8"
          style={{ outline: 'none', border: 'none' }}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSendMessage}
          type='button'
          className="w-8 h-8 bg-brand-red text-white rounded-xl shadow-md flex items-center justify-center p-1"
          style={{ marginRight: '5px' }}
        >
          <img src="/chatupload.png" alt="Chat Upload Button" /> 
        </button>
      </div>
    </div>
  );
  
};

export default Chatbot;
