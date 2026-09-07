'use client';

import { useState } from 'react';
import CreateClientModal from '@/components/CreateClientModal';

export default function AddClientButton({ businessId }: { businessId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="bg-kreo-ink text-kreo-surface px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-black transition-colors shadow-sm"
      >
        Add Client
      </button>
      
      <CreateClientModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        businessId={businessId} 
      />
    </>
  );
}
