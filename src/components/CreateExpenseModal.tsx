'use client';

import { useState } from 'react';
import { createExpense } from '@/actions/finance';

export default function CreateExpenseModal({ 
  isOpen, 
  onClose, 
  businessId 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  businessId: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setError(null);
    
    const category = formData.get('category') as string;
    const amount = Number(formData.get('amount'));
    const vendor = formData.get('vendor') as string;
    const description = formData.get('description') as string;
    const date = new Date(formData.get('date') as string);
    
    const result = await createExpense({ category, amount, vendor, description, date });
    
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
          <h2 className="font-bold text-lg">Record Expense</h2>
          <button onClick={onClose} className="text-kreo-ink/50 hover:text-kreo-ink">
            ✕
          </button>
        </div>
        
        <form action={handleSubmit} className="p-6 overflow-y-auto">
          {error && <div className="mb-4 p-3 bg-kreo-danger/10 text-kreo-danger text-sm rounded-lg">{error}</div>}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Amount (UGX) *</label>
              <input required name="amount" type="number" step="0.01" className="w-full px-4 py-2 border border-kreo-ink/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-kreo-amber" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category *</label>
              <input required name="category" type="text" placeholder="e.g. Transport, Equipment" className="w-full px-4 py-2 border border-kreo-ink/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-kreo-amber" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Vendor/Payee</label>
              <input name="vendor" type="text" className="w-full px-4 py-2 border border-kreo-ink/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-kreo-amber" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Date *</label>
              <input required name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full px-4 py-2 border border-kreo-ink/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-kreo-amber" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea name="description" rows={2} className="w-full px-4 py-2 border border-kreo-ink/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-kreo-amber"></textarea>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg text-sm font-medium text-kreo-ink/70 hover:bg-kreo-ink/5">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="bg-kreo-ink text-kreo-surface px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-black transition-colors disabled:opacity-50">
              {isSubmitting ? 'Recording...' : 'Record Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
