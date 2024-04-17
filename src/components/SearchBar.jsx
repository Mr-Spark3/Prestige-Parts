import React, { useState } from "react";
import { parts } from "../Data/PartsData";

function SearchBar({ onSearch, onAddToCart }) {
    const [query, setQuery] = useState("");
    const [showResults, setShowResults] = useState(false);
  
    const handleSearch = (e) => {
      e.preventDefault();
      if (query.trim() === "") {
        return;
      }
  
      const filteredParts = parts.filter((part) =>
        part.description.toLowerCase().includes(query.toLowerCase())
      );
      onSearch(filteredParts);
      setShowResults(true);
    };
  
    const handleItemClick = (part) => {
      setQuery(part.description);
      setShowResults(false);
      onAddToCart(part); // Pass selected part to onAddToCart callback
    };
  

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          type="text"
          placeholder="Search part name or keyword (e.g., oil filter)"
          className="border border-gray-300 bg-white h-10 px-5 pr-10 rounded-lg text-sm focus:outline-none w-[500px] m-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowResults(true)}
        />
        <button
          type="submit"
          className="bg-gray-200 text-gray-700 h-10 px-3 rounded-lg ml-2 m-10"
        >
          Search
        </button>
      </form>
      {showResults && (
        <div className="absolute bg-white border border-gray-300 w-[500px] mt-1 z-10">
          {parts
            .filter((part) =>
              part.description.toLowerCase().includes(query.toLowerCase())
            )
            .map((part) => (
              <div
                key={part.partNumber}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleItemClick(part)}
              >
                <p>{part.description}</p>
                <p>{part.partNumber}</p>
                <p>{part.Price}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
