'use client';

import React from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'

type modalTypes = {
    open: boolean;
    onClose: ()=> void;
    children: React.ReactNode;
};

const DocumentModal: React.FC<modalTypes> = ({open, onClose, children}) => {
    return(
    <div
        className={`fixed inset-0 flex justify-center items-center 
        transition-colors ${open ? "visible bg-black/20" : "invisible"} 
        `} 
        onClick={onClose}
        >
            <div className={`bg-white rounded-lg shadow p-6 
            transition-all max-w-xl 
            ${open ? "scale-100": "scale-110 opacitiy-50"}`}
            onClick={(e)=> e.stopPropagation()}>
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

export default DocumentModal;
//<button className='bg-brand-red'> Editing an article </button>
//<button className='bg-brand-red'> Promoting an article </button>