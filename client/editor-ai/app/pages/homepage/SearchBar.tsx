import React from "react";
import Image from 'next/image';

// searchbarprops
interface SearchBarProps {
  searchQuery: String;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;}

const SearchBar = ({searchQuery,setSearchQuery}:SearchBarProps) => {


  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    console.log(`Query: ${text}`)
    setSearchQuery(text);
  };





  return (
    <div className="max-w-full mx-auto px-4 py-4">
      <div className="shadow-md outline-none flex w-full items-center border-4 custom-border-color rounded-search-bar bg-brand-tan">
        <button type='button' className="h-6 w-6 ml-2">
          <Image src="/search.svg" alt="Search Icon" width={15.99} height={15.99} />
        </button>
        <input
          type="text"
          placeholder="Search Documents and Files..."
          onChange={handleQueryChange}
          className="w-full bg-brand-tan pr-2 py-1 placeholder-brand-red" 
          style={{ fontFamily: 'Poppins' , outline: 'none', border: 'none' }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
