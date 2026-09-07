import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { requireBusinessId } from '@/lib/auth-utils';
import { notFound } from 'next/navigation';

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const businessId = await requireBusinessId();

  const client = await prisma.client.findUnique({
    where: { 
      id,
      businessId, 
    },
    include: {
      projects: {
        orderBy: { createdAt: 'desc' }
      },
      invoices: {
        orderBy: { issueDate: 'desc' }
      },
      quotes: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!client) {
    notFound();
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <Link href="/dashboard/clients" className="text-kreo-ink/50 hover:text-kreo-ink text-sm flex items-center gap-1">
          ← Back to Clients
        </Link>
      </div>

      <header className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">{client.name}</h1>
            <span className="px-2 py-1 bg-kreo-amber/10 text-kreo-amber text-xs font-bold rounded uppercase tracking-wider">
              {client.type}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-kreo-ink/60">
            {client.email && <span>📧 {client.email}</span>}
            {client.phone && <span>📱 {client.phone}</span>}
          </div>
        </div>
      </header>

      {/* Basic Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-kreo-panel rounded-xl p-5 border border-kreo-ink/10">
          <p className="text-sm text-kreo-ink/60 mb-1">Total Projects</p>
          <p className="text-2xl font-bold">{client.projects.length}</p>
        </div>
        <div className="bg-kreo-panel rounded-xl p-5 border border-kreo-ink/10">
          <p className="text-sm text-kreo-ink/60 mb-1">Total Invoices</p>
          <p className="text-2xl font-bold">{client.invoices.length}</p>
        </div>
        <div className="bg-kreo-panel rounded-xl p-5 border border-kreo-ink/10">
          <p className="text-sm text-kreo-ink/60 mb-1">Active Quotes</p>
          <p className="text-2xl font-bold">{client.quotes.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Projects Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Projects</h2>
            </div>
            
            <div className="bg-kreo-panel border border-kreo-ink/10 rounded-xl overflow-hidden">
              {client.projects.length === 0 ? (
                <div className="p-8 text-center text-kreo-ink/50">
                  No projects for this client yet.
                </div>
              ) : (
                <ul className="divide-y divide-kreo-ink/5">
                  {client.projects.map(project => (
                    <li key={project.id} className="p-4 flex justify-between items-center hover:bg-kreo-ink/5">
                      <Link href={`/dashboard/projects/${project.id}`} className="block flex-1">
                        <p className="font-medium hover:text-kreo-amber">{project.name}</p>
                      </Link>
                      <span className="text-xs bg-kreo-ink/5 px-2 py-1 rounded font-medium">{project.status}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          {/* Recent Invoices Section */}
          <section>
            <h2 className="text-xl font-bold mb-4">Invoices</h2>
            <div className="bg-kreo-panel border border-kreo-ink/10 rounded-xl overflow-hidden">
              {client.invoices.length === 0 ? (
                <div className="text-center text-kreo-ink/50 py-8">No invoices yet.</div>
              ) : (
                <ul className="divide-y divide-kreo-ink/5">
                  {client.invoices.map(invoice => (
                    <li key={invoice.id} className="p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{invoice.invoiceNumber}</p>
                        <p className="text-sm text-kreo-ink/60">{new Date(invoice.issueDate).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold block">UGX {Number(invoice.totalAmount).toLocaleString()}</span>
                        <span className="text-xs text-kreo-amber uppercase font-bold">{invoice.status}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
