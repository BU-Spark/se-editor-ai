"use client"
import './styles/globals.css'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


function App() {
  const router = useRouter();

  useEffect(() => {
    router.push('/pages/login');
  }, [])
 
}

export default App;