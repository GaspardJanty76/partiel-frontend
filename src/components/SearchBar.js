import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mt-10">
      <input
        type="text"
        className="border border-gray-300 rounded-l-lg p-2 w-full md:w-1/2"
        placeholder="Recherchez un film..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="bg-orange-500 text-white p-2 rounded-r-lg"
      >
        Rechercher
      </button>
    </form>
  );
};

export default SearchBar;
