'use client';

import { useState } from 'react';
import CreateTaskModal from '@/components/CreateTaskModal';

export default function AddTaskButton({ projects }: { projects: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="bg-kreo-ink text-kreo-surface px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-black transition-colors shadow-sm"
      >
        Add Task
      </button>
      
      <CreateTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        projects={projects} 
      />
    </>
  );
}
