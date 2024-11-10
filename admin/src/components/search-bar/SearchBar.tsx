import React, { useState } from 'react';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Search query:', query);
  };

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSearchSubmit} className="flex border-2 items-center border border-gray-400  rounded-md overflow-hidden shadow-sm focus-within:shadow-md transition-all duration-300">
        <input
          type="search"
          className="flex-1 py-2 px-4 text-sm text-gray-700 bg-white placeholder-gray-400 focus:outline-none rounded-md transition duration-300 ease-in-out"
          placeholder="Cari produk disini..."
          aria-label="Search"
          value={query}
          onChange={handleSearchChange}
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-md ml-2 transition-colors duration-200 hover:bg-blue-600 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
