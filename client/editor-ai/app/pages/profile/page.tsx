"use client"

import React, { useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';
import Profile from './Profile';

  
  const App = () => {

    
    return (
      <div >
      {/* className="w-full bg-brand-tan" style={{ backgroundColor: '#F5F0EF', width: '100%',  height: '100%', margin:'0rem'}}> */}
        <div className="homepage" > 
          <Profile />
        </div>
      </div>
    );
  };
  
export default App;