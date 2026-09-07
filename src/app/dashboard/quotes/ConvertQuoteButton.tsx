'use client';

import { useState } from 'react';
import { convertQuoteToInvoice } from '@/actions/finance';
import { useRouter } from 'next/navigation';

export default function ConvertQuoteButton({ quoteId }: { quoteId: string }) {
  const [isConverting, setIsConverting] = useState(false);
  const router = useRouter();

  async function handleConvert() {
    setIsConverting(true);
    const result = await convertQuoteToInvoice(quoteId);
    if (result.success) {
      router.push('/dashboard/invoices');
    } else {
      alert(result.error || 'Failed to convert quote');
    }
    setIsConverting(false);
  }

  return (
    <button 
      onClick={handleConvert}
      disabled={isConverting}
      className="text-kreo-amber font-medium disabled:opacity-50 hover:opacity-80"
    >
      {isConverting ? 'Converting...' : 'Convert to Invoice'}
    </button>
  );
}
