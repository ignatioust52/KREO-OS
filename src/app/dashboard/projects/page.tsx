import Link from 'next/link';
import { getProjects } from '@/actions/projects';
import AddProjectButton from './AddProjectButton';
import { requireBusinessId } from '@/lib/auth-utils';
import { getClients } from '@/actions/clients';

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const statusFilter = (params.status as string) || 'ACTIVE';
  const isNew = params.new === 'true';

  const businessId = await requireBusinessId();
  const { projects } = await getProjects(statusFilter);
  const { clients } = await getClients();

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-kreo-ink/60 mt-1">Manage your active and completed creative work.</p>
        </div>
        <AddProjectButton businessId={businessId} initialOpen={isNew} clients={clients || []} />
      </header>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-kreo-ink/10 mb-6">
        <Link href="/dashboard/projects?status=ACTIVE" className={`py-3 font-medium ${statusFilter === 'ACTIVE' ? 'border-b-2 border-kreo-ink' : 'text-kreo-ink/50 hover:text-kreo-ink'}`}>Active</Link>
        <Link href="/dashboard/projects?status=COMPLETED" className={`py-3 font-medium ${statusFilter === 'COMPLETED' ? 'border-b-2 border-kreo-ink' : 'text-kreo-ink/50 hover:text-kreo-ink'}`}>Completed</Link>
        <Link href="/dashboard/projects?status=ARCHIVED" className={`py-3 font-medium ${statusFilter === 'ARCHIVED' ? 'border-b-2 border-kreo-ink' : 'text-kreo-ink/50 hover:text-kreo-ink'}`}>Archived</Link>
      </div>

      {/* Filters & Search */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="px-4 py-2 bg-kreo-panel border border-kreo-ink/10 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-kreo-amber"
          />
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {projects?.length === 0 ? (
           <div className="col-span-full py-12 text-center text-kreo-ink/50">
             No projects found.
           </div>
        ) : (
          projects?.map((project: any) => (
            <Link key={project.id} href={`/dashboard/projects/${project.id}`} className="bg-kreo-panel rounded-2xl p-5 shadow-sm border border-kreo-ink/10 hover:shadow-md transition-shadow group block">
              <div className="w-full h-32 bg-kreo-ink/5 rounded-xl mb-4 relative overflow-hidden">
                <div className="absolute top-2 right-2 bg-kreo-panel/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-kreo-amber uppercase tracking-wider">{project.status}</div>
              </div>
              <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-kreo-amber transition-colors">{project.name}</h3>
              <p className="text-sm text-kreo-ink/60 mb-4">Client: {project.client?.name}</p>
              
              <div className="flex items-center justify-between text-sm mb-4 border-t border-kreo-ink/10 pt-4">
                <div>
                  <p className="text-kreo-ink/50 mb-0.5 text-xs">Value</p>
                  <p className="font-semibold">UGX {Number(project.value || 0).toLocaleString()}</p>
                </div>
              </div>
            </Link>
          ))
        )}

      </div>
    </div>
  );
}
