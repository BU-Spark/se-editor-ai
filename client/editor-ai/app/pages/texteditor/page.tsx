"use client"

import React, { useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import TextEditor from './TextEditor';
//import axios from 'axios';
import AskAIBot from '@/components/CreateDocumentModal';

  
  const App = () => {
    const { user } = useAuth();
    const router = useRouter();
  
    useEffect(() => {
      if (user == null) {
        router.push("/pages/login"); // Redirect to login page if user is not authenticated
      }
    }, [user]);
  
    const [showAskAIBot, setShowAskAIBot] = useState(false);
    
    return (
      <div className="w-full bg-brand-tan" style={{ backgroundColor: '#F5F0EF', width: '100%',  height: '100%', margin:'0rem'}}>
        <TextEditor /> {/* change this line once the projects page is set up */}
      </div>
    );
  };
  
  export default App;