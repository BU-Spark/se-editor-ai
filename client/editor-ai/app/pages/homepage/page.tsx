"use client"
// Assuming ProjectSection accepts a prop structure like this:
import React, { useEffect } from 'react';
import HomePage from './HomePage';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (user == null) {
  //     router.push("/admin"); // Redirect to login page if user is not authenticated
  //   }
  // }, [user, router]);

  return (
    <div className="homepage"> 
      {/* {user && <HomePage />} Render HomePage only if user is signed in */}
      <HomePage/>
    </div>
  );
};

export default Home;
