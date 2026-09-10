import Link from 'next/link';
import { getInvoices } from '@/actions/finance';
import { requireBusinessId } from '@/lib/auth-utils';
import CreateInvoiceButton from './CreateInvoiceButton';
import { prisma } from '@/lib/prisma';

export default async function InvoicesPage() {
  const businessId = await requireBusinessId();
  const { invoices } = await getInvoices();
  const clients = await prisma.client.findMany({ where: { businessId } });
  const projects = await prisma.project.findMany({ where: { businessId } });

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-kreo-ink/60 mt-1">Manage billing, payments, and outstanding balances.</p>
        </div>
        <CreateInvoiceButton clients={clients} projects={projects} />
      </header>

      {/* Filters & Search */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <input 
            type="text" 
            placeholder="Search invoices..." 
            className="px-4 py-2 bg-kreo-panel border border-kreo-ink/10 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-kreo-amber"
          />
          <select className="px-4 py-2 bg-kreo-panel border border-kreo-ink/10 rounded-lg text-sm focus:outline-none">
            <option>All Statuses</option>
            <option>Unpaid</option>
            <option>Paid</option>
            <option>Overdue</option>
            <option>Draft</option>
          </select>
        </div>
      </div>

      {/* Invoices List */}
      <div className="bg-kreo-panel rounded-2xl shadow-sm border border-kreo-ink/10 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-kreo-ink/10 bg-kreo-ink/5">
              <th className="py-3 px-5 text-xs font-semibold text-kreo-ink/60 uppercase tracking-wider">Invoice</th>
              <th className="py-3 px-5 text-xs font-semibold text-kreo-ink/60 uppercase tracking-wider">Client</th>
              <th className="py-3 px-5 text-xs font-semibold text-kreo-ink/60 uppercase tracking-wider">Amount</th>
              <th className="py-3 px-5 text-xs font-semibold text-kreo-ink/60 uppercase tracking-wider">Issued Date</th>
              <th className="py-3 px-5 text-xs font-semibold text-kreo-ink/60 uppercase tracking-wider">Status</th>
              <th className="py-3 px-5 text-right text-xs font-semibold text-kreo-ink/60 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-kreo-ink/5 text-sm">
            {invoices?.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-kreo-ink/50">
                  No invoices found.
                </td>
              </tr>
            ) : (
              invoices?.map((invoice: any) => (
                <tr key={invoice.id} className="hover:bg-kreo-ink/5 transition-colors group">
                  <td className="py-4 px-5 font-medium">{invoice.id.substring(0,8)}</td>
                  <td className="py-4 px-5">
                    <span className="block font-medium">{invoice.client?.name}</span>
                    <span className="text-xs text-kreo-ink/60">{invoice.project?.name}</span>
                  </td>
                  <td className="py-4 px-5 font-medium">UGX {Number(invoice.totalAmount).toLocaleString()}</td>
                  <td className="py-4 px-5 text-kreo-ink/70">{new Date(invoice.issueDate).toLocaleDateString()}</td>
                  <td className="py-4 px-5">
                    <span className="px-2 py-1 bg-kreo-amber/10 text-kreo-amber text-xs font-bold rounded uppercase tracking-wider">{invoice.status}</span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button className="text-kreo-ink/50 hover:text-kreo-ink font-medium">View</button>
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
