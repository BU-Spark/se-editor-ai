'use client';

import React from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'

type modalTypes = {
    open: boolean;
    onClose: ()=> void;
    children: React.ReactNode;
};

const CreateDocumentModal: React.FC<modalTypes> = ({open, onClose, children}) => {
    return(
    <div
        className={`fixed inset-0 flex justify-center items-center 
        transition-colors ${open ? "visible bg-black/30" : "invisible"} 
        `} 
        onClick={onClose}
        style={{ zIndex: open ? 50 : -1 }}
        >
            <div className={`bg-white rounded-lg shadow p-6 
            transition-all 
            ${open ? "scale-100": "scale-110 opacitiy-50"}`}
            onClick={(e)=> e.stopPropagation()}
            style={{ width: '982px',
            height: '497px',
            top: '185px', // Center vertically
            left: '149px', // Center horizontally
            borderRadius: '21px',
            backgroundColor: 'rgba(245, 240, 239, 0.95)',  // Semi-transparent background
            zIndex: 100
            }} >

            <button 
                className="absolute top-2 right-2 py-1 px-2 border 
                border-neutral-200 rounded-md text-gray-400 
                bg-white hover:bg-gray-50 hover:text-gray-600" 
            onClick={onClose}


            > 
                X 
            </button>
            {children}
        </div>
    </div>
    );
};

export default CreateDocumentModal;
