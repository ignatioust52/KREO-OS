import Link from 'next/link';
import BusinessSwitcher from '@/components/BusinessSwitcher';
import { logout } from '@/actions/auth';

export const dynamic = 'force-dynamic';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-kreo-surface text-kreo-ink font-sans flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-kreo-panel border-r border-kreo-ink/10 flex flex-col shrink-0">
        <div className="p-4 border-b border-kreo-ink/10 flex items-center gap-3">
          <Link href="/dashboard" className="w-8 h-8 bg-kreo-ink rounded-sm flex items-center justify-center text-kreo-surface font-bold text-xl shrink-0">
            K
          </Link>
          <BusinessSwitcher />
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <div className="text-xs font-semibold text-kreo-ink/50 uppercase tracking-wider mb-2 px-3 mt-4">Work</div>
          <Link href="/dashboard/projects" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-kreo-ink/5 text-kreo-ink/80 hover:text-kreo-ink">
            Projects
          </Link>
          <Link href="/dashboard/tasks" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-kreo-ink/5 text-kreo-ink/80 hover:text-kreo-ink">
            Tasks
          </Link>

          <div className="text-xs font-semibold text-kreo-ink/50 uppercase tracking-wider mb-2 px-3 mt-8">People</div>
          <Link href="/dashboard/clients" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-kreo-ink/5 text-kreo-ink/80 hover:text-kreo-ink">
            Clients
          </Link>
          <Link href="/dashboard/team" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-kreo-ink/5 text-kreo-ink/80 hover:text-kreo-ink">
            Team
          </Link>

          <div className="text-xs font-semibold text-kreo-ink/50 uppercase tracking-wider mb-2 px-3 mt-8">Money</div>
          <Link href="/dashboard/finance" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-kreo-ink/5 text-kreo-ink/80 hover:text-kreo-ink">
            Finance
          </Link>
          <Link href="/dashboard/quotes" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-kreo-ink/5 text-kreo-ink/80 hover:text-kreo-ink">
            Quotes
          </Link>
          <Link href="/dashboard/invoices" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-kreo-ink/5 text-kreo-ink/80 hover:text-kreo-ink">
            Invoices
          </Link>
          
          <div className="text-xs font-semibold text-kreo-ink/50 uppercase tracking-wider mb-2 px-3 mt-8">Grow</div>
          <Link href="/dashboard/analytics" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-kreo-ink/5 text-kreo-ink/80 hover:text-kreo-ink">
            Pulse (Analytics)
          </Link>
          <Link href="/dashboard/ai" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-kreo-ink/5 text-kreo-signal bg-kreo-ink hover:bg-black">
            KAI Assistant
          </Link>
        </nav>
        
        <div className="p-4 border-t border-kreo-ink/10">
          <Link href="/settings" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-kreo-ink/5 text-kreo-ink/80 hover:text-kreo-ink">
            Settings
          </Link>
          <form action={logout}>
            <button type="submit" className="flex items-center px-3 py-2 w-full text-left text-sm font-medium rounded-lg hover:bg-kreo-ink/5 text-kreo-danger mt-1">
              Log out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
