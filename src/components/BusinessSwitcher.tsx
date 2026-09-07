'use client';

import { useState } from 'react';
import Link from 'next/link';

// Dummy data for now
const businesses = [
  { id: '1', name: 'John Photography' },
  { id: '2', name: 'John Media Agency' },
  { id: '3', name: 'John Farm' },
];

export default function BusinessSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeBusiness, setActiveBusiness] = useState(businesses[0]);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-kreo-ink/5 transition-colors font-medium text-sm w-full md:w-auto justify-between"
      >
        <span className="truncate max-w-[150px]">{activeBusiness.name}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-kreo-panel border border-kreo-ink/10 rounded-xl shadow-lg z-50 overflow-hidden">
          <div className="p-2">
            <div className="text-xs font-medium text-kreo-ink/50 px-2 py-1 uppercase tracking-wider mb-1">Your businesses</div>
            {businesses.map((business) => (
              <button
                key={business.id}
                onClick={() => {
                  setActiveBusiness(business);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-2 py-2 rounded-lg text-sm hover:bg-kreo-ink/5 flex items-center justify-between ${activeBusiness.id === business.id ? 'bg-kreo-ink/5 font-medium' : ''}`}
              >
                {business.name}
                {activeBusiness.id === business.id && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-kreo-success">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </button>
            ))}
          </div>
          <div className="border-t border-kreo-ink/10 p-2">
            <Link 
              href="/dashboard/businesses/new"
              className="flex items-center gap-2 w-full text-left px-2 py-2 rounded-lg text-sm hover:bg-kreo-ink/5 text-kreo-ink/80"
              onClick={() => setIsOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Create another business
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
