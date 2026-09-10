'use client';

import { useState } from 'react';
import { createProject } from '@/actions/projects';

export default function CreateProjectModal({ isOpen, onClose, businessId, clients }: { isOpen: boolean, onClose: () => void, businessId: string, clients: any[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setError(null);
    
    const name = formData.get('name') as string;
    const clientId = formData.get('clientId') as string;
    
    if (!clientId) {
      setError('Please select a client');
      setIsSubmitting(false);
      return;
    }
    
    const result = await createProject({ name, clientId });
    
    if (result.success) {
      onClose();
    } else {
      setError(result.error || 'Something went wrong');
    }
    setIsSubmitting(false);
  }

  return (
    <div className="fixed inset-0 bg-kreo-ink/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-kreo-panel w-full max-w-md rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-kreo-ink/10 flex items-center justify-between">
          <h2 className="font-bold text-lg">Create New Project</h2>
          <button onClick={onClose} className="text-kreo-ink/50 hover:text-kreo-ink">
            ✕
          </button>
        </div>
        
        <form action={handleSubmit} className="p-6 overflow-y-auto">
          {error && <div className="mb-4 p-3 bg-kreo-danger/10 text-kreo-danger text-sm rounded-lg">{error}</div>}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Project Name *</label>
              <input required name="name" type="text" className="w-full px-4 py-2 border border-kreo-ink/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-kreo-amber" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Client *</label>
              <select required name="clientId" className="w-full px-4 py-2 border border-kreo-ink/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-kreo-amber bg-kreo-surface">
                <option value="">Select a client...</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg text-sm font-medium text-kreo-ink/70 hover:bg-kreo-ink/5">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="bg-kreo-ink text-kreo-surface px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-black transition-colors disabled:opacity-50">
              {isSubmitting ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
