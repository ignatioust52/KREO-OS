import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { requireBusinessId } from '@/lib/auth-utils';
import { auth } from '@/auth';

export default async function DashboardHome() {
  const session = await auth();
  const userName = session?.user?.name?.split(' ')[0] || 'there';
  const businessId = await requireBusinessId();

  // Fetch business data
  const business = await prisma.business.findUnique({
    where: { id: businessId },
    include: {
      projects: {
        where: { status: 'ACTIVE' },
        include: { client: true, tasks: true },
        take: 5,
        orderBy: { updatedAt: 'desc' }
      },
      invoices: true,
      expenses: true,
    }
  });

  if (!business) {
    return <div>Business not found.</div>;
  }

  // Fetch open tasks for this business across all projects
  const openTasks = await prisma.task.findMany({
    where: {
      status: 'TODO',
      project: { businessId }
    }
  });

  // Calculate metrics
  const currentMonthStart = new Date();
  currentMonthStart.setDate(1);
  currentMonthStart.setHours(0, 0, 0, 0);

  const thisMonthInvoices = business.invoices.filter(i => new Date(i.issueDate) >= currentMonthStart);
  const thisMonthExpenses = business.expenses.filter(e => new Date(e.date) >= currentMonthStart);

  const totalRevenue = thisMonthInvoices.reduce((sum, inv) => sum + Number(inv.totalAmount), 0);
  const totalExpenses = thisMonthExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  const profit = totalRevenue - totalExpenses;
  
  const outstandingInvoices = business.invoices.filter(inv => inv.status !== 'PAID');
  const outstandingAmount = outstandingInvoices.reduce((sum, inv) => sum + (Number(inv.totalAmount) - Number(inv.amountPaid)), 0);

  // Format currency
  const formatCurrency = (val: number) => `UGX ${val.toLocaleString()}`;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Good morning, {userName}.</h1>
        <p className="text-kreo-ink/60 mt-1">Here is what's happening with {business.name} today.</p>
      </header>

      {/* Daily Brief (KAI) */}
      <section className="mb-10 bg-kreo-panel rounded-2xl p-6 shadow-sm border border-kreo-ink/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-kreo-signal/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <h2 className="text-sm font-bold uppercase tracking-wider text-kreo-ink/50 flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-kreo-signal"></span>
          Today in KREO (KAI)
        </h2>
        <ul className="space-y-3">
          {outstandingInvoices.length > 0 ? (
            <li className="flex items-start gap-3">
              <span className="text-kreo-amber mt-0.5">⚠️</span>
              <div>
                <p className="font-medium">{outstandingInvoices.length} outstanding invoices</p>
                <p className="text-sm text-kreo-ink/70">You have uncollected payments totaling {formatCurrency(outstandingAmount)}.</p>
              </div>
            </li>
          ) : null}
          {openTasks.length > 0 ? (
            <li className="flex items-start gap-3">
              <span className="text-kreo-amber mt-0.5">📋</span>
              <div>
                <p className="font-medium">{openTasks.length} open tasks</p>
                <p className="text-sm text-kreo-ink/70">Keep pushing! Clear your task list to stay on track.</p>
              </div>
            </li>
          ) : null}
          {outstandingInvoices.length === 0 && openTasks.length === 0 && (
            <li className="text-sm text-kreo-ink/70">You're all caught up! No critical alerts right now.</li>
          )}
        </ul>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Financial Snapshot */}
        <div className="bg-kreo-panel rounded-2xl p-6 shadow-sm border border-kreo-ink/10 col-span-2">
          <h2 className="font-semibold mb-4 text-lg">Money (This Month)</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-kreo-ink/60 mb-1">Invoiced</p>
              <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
            </div>
            <div>
              <p className="text-sm text-kreo-ink/60 mb-1">Outstanding (All Time)</p>
              <p className="text-2xl font-bold text-kreo-amber">{formatCurrency(outstandingAmount)}</p>
            </div>
            <div>
              <p className="text-sm text-kreo-ink/60 mb-1">Profit</p>
              <p className={`text-2xl font-bold ${profit >= 0 ? 'text-kreo-success' : 'text-kreo-danger'}`}>{formatCurrency(profit)}</p>
            </div>
          </div>
        </div>

        {/* Next Moves */}
        <div className="bg-kreo-panel rounded-2xl p-6 shadow-sm border border-kreo-ink/10">
          <h2 className="font-semibold mb-4 text-lg">Your Next Moves</h2>
          <Link href="/dashboard/projects?new=true" className="w-full text-left p-3 rounded-lg border border-kreo-ink/10 hover:border-kreo-amber transition-colors mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">Create Project</span>
            <span>+</span>
          </Link>
          <Link href="/dashboard/quotes" className="w-full text-left p-3 rounded-lg border border-kreo-ink/10 hover:border-kreo-amber transition-colors mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">Create Quote</span>
            <span>+</span>
          </Link>
        </div>
      </div>

      {/* Active Projects */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">Active Projects</h2>
          <Link href="/dashboard/projects" className="text-sm font-medium text-kreo-ink/60 hover:text-kreo-ink">View all</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {business.projects.length === 0 ? (
             <div className="col-span-full py-8 text-center text-kreo-ink/50 bg-kreo-panel rounded-2xl border border-kreo-ink/10">
               No active projects.
             </div>
          ) : (
            business.projects.map(project => {
              const totalTasks = project.tasks.length;
              const completedTasks = project.tasks.filter(t => t.status === 'DONE').length;
              const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

              return (
                <Link key={project.id} href={`/dashboard/projects/${project.id}`} className="bg-kreo-panel rounded-2xl p-5 shadow-sm border border-kreo-ink/10 hover:shadow-md transition-shadow cursor-pointer block">
                  <div className="w-full h-32 bg-kreo-ink/5 rounded-xl mb-4 relative flex items-center justify-center">
                    <span className="text-4xl">📁</span>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-kreo-success uppercase tracking-wider">Active</span>
                  </div>
                  <h3 className="font-bold text-lg leading-tight mb-1">{project.name}</h3>
                  <p className="text-sm text-kreo-ink/60 mb-4">Client: {project.client?.name || 'None'}</p>
                  
                  <div className="w-full bg-kreo-ink/10 rounded-full h-1.5 mb-2">
                    <div className="bg-kreo-ink h-1.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                  </div>
                  <p className="text-xs font-medium text-right text-kreo-ink/60">{progress}% complete</p>
                </Link>
              )
            })
          )}

          <Link href="/dashboard/projects?new=true" className="bg-kreo-panel rounded-2xl p-5 shadow-sm border border-kreo-ink/10 hover:shadow-md transition-shadow cursor-pointer border-dashed border-kreo-ink/20 flex flex-col items-center justify-center min-h-[250px] text-kreo-ink/50 hover:text-kreo-ink hover:bg-kreo-ink/5">
            <span className="text-4xl mb-2">+</span>
            <span className="font-medium">New Project</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
