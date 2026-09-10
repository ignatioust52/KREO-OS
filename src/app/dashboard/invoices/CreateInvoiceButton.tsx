'use client';

import { useState } from 'react';
import CreateInvoiceModal from '@/components/CreateInvoiceModal';

export default function CreateInvoiceButton({ clients, projects }: { clients: any[], projects: any[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-kreo-ink text-kreo-surface px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-black transition-colors shadow-sm"
      >
        Create Invoice
      </button>
      <CreateInvoiceModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        clients={clients} 
        projects={projects} 
      />
    </>
  );
}
