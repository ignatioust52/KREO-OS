'use client';

import { useState } from 'react';
import { createTask } from '@/actions/tasks';

export default function CreateTaskModal({ 
  isOpen, 
  onClose, 
  projects 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  projects: any[] 
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setError(null);
    
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const projectId = formData.get('projectId') as string;
    
    if (!projectId) {
      setError('Please select a project');
      setIsSubmitting(false);
      return;
    }
    
    const result = await createTask({ projectId, title, description });
    
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
          <h2 className="font-bold text-lg">Add New Task</h2>
          <button onClick={onClose} className="text-kreo-ink/50 hover:text-kreo-ink">
            ✕
          </button>
        </div>
        
        <form action={handleSubmit} className="p-6 overflow-y-auto">
          {error && <div className="mb-4 p-3 bg-kreo-danger/10 text-kreo-danger text-sm rounded-lg">{error}</div>}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Task Title *</label>
              <input required name="title" type="text" className="w-full px-4 py-2 border border-kreo-ink/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-kreo-amber" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Project *</label>
              <select required name="projectId" className="w-full px-4 py-2 border border-kreo-ink/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-kreo-amber bg-kreo-surface">
                <option value="">Select a project...</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea name="description" rows={3} className="w-full px-4 py-2 border border-kreo-ink/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-kreo-amber"></textarea>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg text-sm font-medium text-kreo-ink/70 hover:bg-kreo-ink/5">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="bg-kreo-ink text-kreo-surface px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-black transition-colors disabled:opacity-50">
              {isSubmitting ? 'Saving...' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
