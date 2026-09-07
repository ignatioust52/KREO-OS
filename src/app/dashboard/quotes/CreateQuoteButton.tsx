'use client';

import { useState } from 'react';
import CreateQuoteModal from '@/components/CreateQuoteModal';

export default function CreateQuoteButton({ 
  businessId, 
  clients, 
  projects 
}: { 
  businessId: string;
  clients: any[];
  projects: any[];
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="bg-kreo-ink text-kreo-surface px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-black transition-colors shadow-sm"
      >
        Create Quote
      </button>
      
      <CreateQuoteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        businessId={businessId}
        clients={clients}
        projects={projects}
      />
    </>
  );
}
