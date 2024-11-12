'use client';

import React from "react";

type OptionButtonProps = {
    text: string;
    onClick?: () => void;
};

const OptionButton: React.FC<OptionButtonProps> = ({ text, onClick }) => {
    const buttonClasses = `inline-block m-4 px-6 py-4 text-lg border-4 custom-border-color font-bold
    rounded-xl cursor-pointer transition-colors duration-300 ease-in-out mr-2 flex items-center italic justify-center 
    bg-white text-brand-red hover:bg-brand-red hover:text-white`;

    return (
        <div>
            <button onClick={onClick} className={buttonClasses} style={{ border: '6.05px solid rgba(128, 18, 18, 1)', fontSize: '21px', boxShadow: '3.45px 3.45px 5.18px 0.86px rgba(0, 0, 0, 0.25)', width: '284.14px', fontFamily: 'newsreader' }}>
                {text}
            </button>
        </div>
    );
};

export default OptionButton;
