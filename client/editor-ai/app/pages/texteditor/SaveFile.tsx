'use client';

import { Newsreader } from "next/font/google";
import React, { useState, useRef } from "react";


type SaveButtonProps = {
    text: string;
    onClick?: () => void;

};

const SaveButton = ({ text, onClick}: SaveButtonProps) => {
  //const fileInputRef = useRef<HTMLInputElement>(null);
  const [isActive, setIsActive] = useState(false); 

  const handleButtonClick = () => {
    setIsActive(current => !current);
    if (onClick){
      onClick()
    }
    console.log("clicked");
  };



  const buttonClasses = `inline-block m-4 px-6 py-3 text-lg border-4 custom-border-color 
  rounded-xl cursor-pointer transition-colors duration-300 ease-in-out mr-2 flex items-center justify-center 
  ${isActive ? 'bg-brand-red text-white' : 'bg-white text-brand-red hover:bg-brand-red hover:text-white'}`;



  return (
    <div>
      


        <button onClick={handleButtonClick} className={buttonClasses} style={{ border: '6.05px solid rgba(128, 18, 18, 1)', fontSize:'22.5px',
  boxShadow: isActive ? 'inset 0 2px 4px rgba(0, 0, 0, 0.3)' : '3.45px 3.45px 5.18px 0.86px rgba(0, 0, 0, 0.25)',
  width: '284.14px', fontFamily: 'Poppins'
}}>
        {text}
        </button>
    </div>
    
  );
};

export default SaveButton;