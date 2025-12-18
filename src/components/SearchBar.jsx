import React, { useState } from 'react';

const SearchBar = ({ onSearch, isLoading }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-xl mx-auto flex items-center gap-3"
    >
      <div className="flex-1 flex items-center gap-2 rounded-2xl bg-slate-900/70 ring-1 ring-slate-700/60 px-4 py-3 shadow-soft-xl backdrop-blur-md">
        <span className="text-sky-300/80">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="w-5 h-5"
          >
            <circle cx="11" cy="11" r="6" />
            <path d="m16 16 4 4" />
          </svg>
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search city (e.g. Karachi, London, Tokyo)"
          className="w-full bg-transparent outline-none text-slate-50 placeholder:text-slate-400 text-sm md:text-base"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex items-center justify-center px-4 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 disabled:bg-slate-700 text-sm font-medium text-slate-950 shadow-soft-xl transition-colors"
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default SearchBar;
