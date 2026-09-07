'use client';

import { useState } from 'react';
import CreateExpenseModal from '@/components/CreateExpenseModal';

export default function RecordExpenseButton({ businessId }: { businessId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="bg-kreo-panel border border-kreo-ink/10 text-kreo-ink px-4 py-2 rounded-lg text-sm font-medium hover:bg-kreo-ink/5 transition-colors"
      >
        Record Expense
      </button>
      
      <CreateExpenseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        businessId={businessId} 
      />
    </>
  );
}
