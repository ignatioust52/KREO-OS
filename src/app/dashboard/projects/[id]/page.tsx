import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { requireBusinessId } from '@/lib/auth-utils';
import { notFound } from 'next/navigation';

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const businessId = await requireBusinessId();

  const project = await prisma.project.findUnique({
    where: { 
      id,
      businessId, // Ensure it belongs to the current business
    },
    include: {
      client: true,
      tasks: {
        orderBy: { createdAt: 'desc' }
      },
      deliverables: true,
      invoices: true,
    }
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <Link href="/dashboard/projects" className="text-kreo-ink/50 hover:text-kreo-ink text-sm flex items-center gap-1">
          ← Back to Projects
        </Link>
      </div>

      <header className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
            <span className="px-2 py-1 bg-kreo-amber/10 text-kreo-amber text-xs font-bold rounded uppercase tracking-wider">
              {project.status}
            </span>
          </div>
          <p className="text-kreo-ink/60">Client: <Link href={`/dashboard/clients/${project.clientId}`} className="underline hover:text-kreo-amber">{project.client?.name}</Link></p>
        </div>
      </header>

      {/* Basic Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-kreo-panel rounded-xl p-5 border border-kreo-ink/10">
          <p className="text-sm text-kreo-ink/60 mb-1">Project Value</p>
          <p className="text-2xl font-bold">UGX {Number(project.value).toLocaleString()}</p>
        </div>
        <div className="bg-kreo-panel rounded-xl p-5 border border-kreo-ink/10">
          <p className="text-sm text-kreo-ink/60 mb-1">Tasks</p>
          <p className="text-2xl font-bold">{project.tasks.length}</p>
        </div>
        <div className="bg-kreo-panel rounded-xl p-5 border border-kreo-ink/10">
          <p className="text-sm text-kreo-ink/60 mb-1">Invoices</p>
          <p className="text-2xl font-bold">{project.invoices.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Tasks Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Tasks</h2>
              <Link href={`/dashboard/tasks?project=${project.id}`} className="text-sm text-kreo-amber hover:underline">View All Tasks</Link>
            </div>
            
            <div className="bg-kreo-panel border border-kreo-ink/10 rounded-xl overflow-hidden">
              {project.tasks.length === 0 ? (
                <div className="p-8 text-center text-kreo-ink/50">
                  No tasks for this project yet.
                </div>
              ) : (
                <ul className="divide-y divide-kreo-ink/5">
                  {project.tasks.map(task => (
                    <li key={task.id} className="p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{task.title}</p>
                        {task.description && <p className="text-sm text-kreo-ink/60">{task.description}</p>}
                      </div>
                      <span className="text-xs bg-kreo-ink/5 px-2 py-1 rounded font-medium">{task.status}</span>
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
            <div className="bg-kreo-panel border border-kreo-ink/10 rounded-xl overflow-hidden p-4">
              {project.invoices.length === 0 ? (
                <div className="text-center text-kreo-ink/50 py-4">No invoices yet.</div>
              ) : (
                <ul className="space-y-3">
                  {project.invoices.map(invoice => (
                    <li key={invoice.id} className="flex justify-between items-center border-b border-kreo-ink/5 pb-2 last:border-0 last:pb-0">
                      <span className="text-sm">{invoice.invoiceNumber}</span>
                      <span className="text-sm font-bold">UGX {Number(invoice.totalAmount).toLocaleString()}</span>
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
