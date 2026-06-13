import React from 'react';
import { Search } from 'lucide-react';

const CATEGORIES = ['All', 'Food', 'Travel', 'Shopping', 'Entertainment', 'Bills', 'Others'];

const Filter = ({ activeCategory, onCategoryChange, searchQuery, onSearchChange }) => {
  return (
    <div className="bg-brand-surface-light dark:bg-brand-surface-dark border border-brand-border-light dark:border-brand-border-dark rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300">
      <div className="flex-1">
        <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2.5 uppercase tracking-wider">
          Filter by Category
        </span>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-205 cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white border-primary shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 border-brand-border-light text-slate-650 hover:text-slate-800 dark:bg-brand-container-dark/50 dark:hover:bg-brand-container-dark dark:border-brand-border-dark dark:text-slate-300 dark:hover:text-slate-100'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
      <div className="w-full md:w-64">
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2.5 uppercase tracking-wider">
          Search Expenses
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
            <Search size={15} />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-50 dark:bg-brand-container-dark/50 border border-brand-border-light dark:border-brand-border-dark rounded-xl pl-9 pr-4 py-2.5 text-slate-800 dark:text-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-medium placeholder-slate-400 dark:placeholder-slate-500 text-sm"
            placeholder="e.g. Pizza"
          />
        </div>
      </div>

    </div>
  );
};

export default Filter;
