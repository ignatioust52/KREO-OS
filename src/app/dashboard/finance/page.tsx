import Link from 'next/link';
import { getExpenses } from '@/actions/finance';
import RecordExpenseButton from './RecordExpenseButton';
import { prisma } from '@/lib/prisma';
import { requireBusinessId } from '@/lib/auth-utils';

export default async function FinancePage() {
  const businessId = await requireBusinessId();
  const { expenses = [] } = await getExpenses();

  const invoices = await prisma.invoice.findMany({ where: { businessId } });
  
  const totalExpenses = expenses.reduce((sum: number, exp: any) => sum + Number(exp.amount), 0);
  
  // A simplistic view for the prototype: Net Profit = Total Invoiced - Total Expenses
  // A real app would sum Payments, but we don't have Payments wired entirely yet.
  const totalRevenue = invoices.reduce((sum, inv) => sum + Number(inv.totalAmount), 0);
  const netProfit = totalRevenue - totalExpenses;
  
  const outstandingInvoices = invoices.filter(inv => inv.status !== 'PAID');
  const outstandingAmount = outstandingInvoices.reduce((sum, inv) => sum + (Number(inv.totalAmount) - Number(inv.amountPaid)), 0);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Finance</h1>
          <p className="text-kreo-ink/60 mt-1">Track your business profitability and cash flow.</p>
        </div>
        <div className="flex gap-3">
          {businessId && <RecordExpenseButton businessId={businessId} />}
          <button className="bg-kreo-ink text-kreo-surface px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-black transition-colors shadow-sm">
            New Invoice
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-kreo-ink/10 mb-6">
        <button className="py-3 font-medium border-b-2 border-kreo-ink">Overview</button>
        <button className="py-3 font-medium text-kreo-ink/50 hover:text-kreo-ink">Expenses</button>
        <button className="py-3 font-medium text-kreo-ink/50 hover:text-kreo-ink">Transactions</button>
        <button className="py-3 font-medium text-kreo-ink/50 hover:text-kreo-ink">Reports</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-kreo-panel rounded-2xl p-6 shadow-sm border border-kreo-ink/10 col-span-2">
          <h2 className="text-sm font-semibold text-kreo-ink/50 uppercase tracking-wider mb-2">Net Profit (YTD)</h2>
          <p className={`text-4xl font-bold mb-2 ${netProfit < 0 ? 'text-kreo-danger' : ''}`}>UGX {netProfit.toLocaleString()}</p>
          <div className="flex items-center gap-2 text-sm font-medium text-kreo-success">
            <span>+12.5%</span>
            <span className="text-kreo-ink/50">vs last year</span>
          </div>
        </div>
        <div className="bg-kreo-panel rounded-2xl p-6 shadow-sm border border-kreo-ink/10">
          <h2 className="text-sm font-semibold text-kreo-ink/50 uppercase tracking-wider mb-2">Outstanding</h2>
          <p className="text-2xl font-bold text-kreo-amber mb-2">UGX {outstandingAmount.toLocaleString()}</p>
          <p className="text-xs font-medium text-kreo-ink/50">Across {outstandingInvoices.length} invoices</p>
        </div>
        <div className="bg-kreo-panel rounded-2xl p-6 shadow-sm border border-kreo-ink/10">
          <h2 className="text-sm font-semibold text-kreo-ink/50 uppercase tracking-wider mb-2">Total Expenses</h2>
          <p className="text-2xl font-bold mb-2">UGX {totalExpenses.toLocaleString()}</p>
          <p className="text-xs font-medium text-kreo-ink/50">This month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 bg-kreo-panel rounded-2xl p-6 shadow-sm border border-kreo-ink/10">
          <h2 className="font-semibold mb-6 text-lg">Cash Flow</h2>
          <div className="w-full h-64 bg-kreo-ink/5 rounded-xl flex items-center justify-center text-kreo-ink/40">
            [Chart Area: Revenue vs Expenses]
          </div>
        </div>

        <div className="bg-kreo-panel rounded-2xl p-6 shadow-sm border border-kreo-ink/10">
          <h2 className="font-semibold mb-4 text-lg">Recent Expenses</h2>
          <div className="space-y-4">
            {expenses.length === 0 ? (
              <p className="text-sm text-kreo-ink/50 py-4 text-center">No expenses recorded yet.</p>
            ) : (
              expenses.slice(0, 5).map((expense: any) => (
                <div key={expense.id} className="flex items-center justify-between border-b border-kreo-ink/5 pb-3">
                  <div>
                    <p className="font-medium text-sm">{expense.category}</p>
                    <p className="text-xs text-kreo-ink/60">{expense.vendor || 'Unknown'} • {new Date(expense.date).toLocaleDateString()}</p>
                  </div>
                  <p className="font-medium text-sm text-kreo-danger">-UGX {Number(expense.amount).toLocaleString()}</p>
                </div>
              ))
            )}
            
            {expenses.length > 5 && (
              <button className="w-full text-center text-sm font-medium text-kreo-ink/60 hover:text-kreo-ink mt-2">
                View all expenses
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
