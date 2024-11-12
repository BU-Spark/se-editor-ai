import { Poppins } from "next/font/google";
import React, { useRef } from "react";


type ActionButtonProps = {
    onClick?: () => void;
    icon?: React.ReactNode;

};

const ActionButton = ({ onClick, icon}: ActionButtonProps) => {


  const handleButtonClick = () => {
    // Trigger the file input dialog when the button is clicked
    console.log("clicked");
  };



  const buttonClasses = "shadow-md font-poppins h-48 w-36 inline-block m-4 px-4 py-2 border-4 custom-border-color rounded bg-brand-tan text-black cursor-pointer text-base transition-colors duration-300 ease-in-out mr-2 hover:bg-red-800 hover:text-white flex flex-col items-center justify-center";

  return (
    <div>
      <input
      />
        <button onClick={onClick} className={buttonClasses}>
        {icon && <img src="/+.svg" className=" icon-class mb-8" alt="icon" style={{ width: '26px', height: '26px'}} />}
        Create Document
        </button>

    </div>
  );
};

export default ActionButton;