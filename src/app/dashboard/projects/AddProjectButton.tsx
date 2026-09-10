'use client';

import { useState } from 'react';
import CreateProjectModal from '@/components/CreateProjectModal';

export default function AddProjectButton({ businessId, initialOpen = false, clients }: { businessId: string, initialOpen?: boolean, clients: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(initialOpen);

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="bg-kreo-ink text-kreo-surface px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-black transition-colors shadow-sm"
      >
        New Project
      </button>
      
      <CreateProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        businessId={businessId} 
        clients={clients}
      />
    </>
  );
}
