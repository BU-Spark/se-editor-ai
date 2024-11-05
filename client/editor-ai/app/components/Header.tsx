"use client"

import Head from 'next/head'
import Link from "next/link";
import Image from "next/image";
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from 'next/navigation'
import Navigation from './NavigationMenu';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // @ts-ignore
  const { user,displayName } = useAuth();
  const auth = getAuth();
  const router = useRouter();


  const handleSignOut = async () => {
      await signOut(auth).then(() => {
        // Sign-out successful.
        router.push("/pages/login");
        setIsMenuOpen(false);
      }).catch((error) => {
        // An error happened
        console.log(error);
      });

  };


  return (
    <>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous'/>
        <link href="https://fonts.googleapis.com/css2?family=Newsreader:wght@400&display=swap" rel="stylesheet"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous'/>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet" />

      <nav className='bg-white font-lg fixed w-full z-20 top-0 start-0 border-b py-1 font-newsreader scroll-py-0' style={{height: '125px'}}>
      <div className="mt-4 flex items-center justify-between mx-4" style={{ color: '#801212'}}>
        <div className="flex-shrink-0">
          <Image 
            src="/header.svg" 
            alt="Editor AI Logo" 
            width={300}
            height={100}
            priority
            className="object-contain"
          />
        </div>

        {user ? (
          <>
            <Navigation />
            <div className="flex items-center">
              <span className="p-4 hidden md:block"> Welcome, {user.displayName} </span>
              <button onClick={handleSignOut} className="text-red bg-brand-tan px-2 py-2 rounded-full hover:bg-red-800 hover:text-white">
                Log Out
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/pages/login" className="font-bold hover:text-brand-red">
              Login
            </Link>
            <Link href="/pages/signup" className="font-bold hover:text-brand-red">
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
    </>
    
  );
};


export default Header;