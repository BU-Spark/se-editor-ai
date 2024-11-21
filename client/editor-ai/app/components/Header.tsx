"use client"

import React from 'react';
import Image from "next/image";
import Navigation from './NavigationMenu';

const Header = () => {
  return (
      <nav className='bg-white font-lg fixed w-full z-20 top-0 start-0 border-b py-1 scroll-py-0' style={{height: '90px'}}>
      <div className="mt-2 flex items-center justify-between mx-4" style={{ color: '#801212', padding: '10px 0' }}>
        <div className="flex-shrink-0 flex items-center">
          <Image 
            src="/header.svg" 
            alt="Editor AI Logo" 
            width={200}
            height={60}
            priority
            className="object-contain"
          />
        </div>
        <Navigation />
      </div>
    </nav>
  );
};


export default Header;