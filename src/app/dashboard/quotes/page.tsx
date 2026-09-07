import Link from 'next/link';
import { getQuotes } from '@/actions/finance';
import CreateQuoteButton from './CreateQuoteButton';
import ConvertQuoteButton from './ConvertQuoteButton';

export default async function QuotesPage() {
  const { quotes = [], clients = [], projects = [], businessId } = await getQuotes();
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quotes & Proposals</h1>
          <p className="text-kreo-ink/60 mt-1">Win work by sending professional quotes and contracts.</p>
        </div>
        {businessId && <CreateQuoteButton businessId={businessId} clients={clients} projects={projects} />}
      </header>

      {/* Filters & Search */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <input 
            type="text" 
            placeholder="Search quotes..." 
            className="px-4 py-2 bg-kreo-panel border border-kreo-ink/10 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-kreo-amber"
          />
          <select className="px-4 py-2 bg-kreo-panel border border-kreo-ink/10 rounded-lg text-sm focus:outline-none">
            <option>All Statuses</option>
            <option>Draft</option>
            <option>Sent</option>
            <option>Accepted</option>
            <option>Declined</option>
          </select>
        </div>
      </div>

      {/* Quotes List */}
      <div className="bg-kreo-panel rounded-2xl shadow-sm border border-kreo-ink/10 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-kreo-ink/10 bg-kreo-ink/5">
              <th className="py-3 px-5 text-xs font-semibold text-kreo-ink/60 uppercase tracking-wider">Quote Ref</th>
              <th className="py-3 px-5 text-xs font-semibold text-kreo-ink/60 uppercase tracking-wider">Client</th>
              <th className="py-3 px-5 text-xs font-semibold text-kreo-ink/60 uppercase tracking-wider">Total Value</th>
              <th className="py-3 px-5 text-xs font-semibold text-kreo-ink/60 uppercase tracking-wider">Valid Until</th>
              <th className="py-3 px-5 text-xs font-semibold text-kreo-ink/60 uppercase tracking-wider">Status</th>
              <th className="py-3 px-5 text-right text-xs font-semibold text-kreo-ink/60 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-kreo-ink/5 text-sm">
            {quotes.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-kreo-ink/50">No quotes generated yet.</td>
              </tr>
            ) : (
              quotes.map((quote: any) => (
                <tr key={quote.id} className="hover:bg-kreo-ink/5 transition-colors group">
                  <td className="py-4 px-5 font-medium">QT-{quote.id.substring(0,8)}</td>
                  <td className="py-4 px-5">
                    <span className="block font-medium">{quote.client?.name || 'Unknown'}</span>
                    <span className="text-xs text-kreo-ink/60">{quote.project?.name || 'No Project'}</span>
                  </td>
                  <td className="py-4 px-5 font-medium">UGX {Number(quote.totalAmount).toLocaleString()}</td>
                  <td className="py-4 px-5 text-kreo-ink/70">{quote.validUntil ? new Date(quote.validUntil).toLocaleDateString() : 'N/A'}</td>
                  <td className="py-4 px-5">
                    <span className={`px-2 py-1 text-xs font-bold rounded uppercase tracking-wider ${
                      quote.status === 'ACCEPTED' ? 'bg-kreo-success/10 text-kreo-success' : 
                      quote.status === 'SENT' ? 'bg-kreo-amber/10 text-kreo-amber' : 
                      'bg-kreo-ink/10 text-kreo-ink'
                    }`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right flex gap-3 justify-end items-center h-full">
                    <button className="text-kreo-ink/50 hover:text-kreo-ink font-medium">View</button>
                    {quote.status !== 'ACCEPTED' && (
                      <ConvertQuoteButton quoteId={quote.id} />
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
