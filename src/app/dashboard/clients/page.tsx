import Link from 'next/link';
import { getClients } from '@/actions/clients';
import AddClientButton from './AddClientButton';
import { requireBusinessId } from '@/lib/auth-utils';

export default async function ClientsPage() {
  const businessId = await requireBusinessId();
  const { clients } = await getClients();

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-kreo-ink/60 mt-1">Manage the people and businesses you work with.</p>
        </div>
        <AddClientButton businessId={businessId} />
      </header>

      {/* Filters & Search */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <input 
            type="text" 
            placeholder="Search clients..." 
            className="px-4 py-2 bg-kreo-panel border border-kreo-ink/10 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-kreo-amber"
          />
        </div>
      </div>

      {/* Clients Table (Card-based for better responsiveness) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {clients?.length === 0 ? (
          <div className="col-span-full py-12 text-center text-kreo-ink/50">
            No clients found.
          </div>
        ) : (
          clients?.map((client: any) => (
            <div key={client.id} className="bg-kreo-panel rounded-2xl p-5 shadow-sm border border-kreo-ink/10 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-kreo-amber/20 text-kreo-amber rounded-full flex items-center justify-center font-bold text-lg">
                    {client.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold leading-tight">{client.name}</h3>
                    <p className="text-xs text-kreo-ink/60">{client.type}</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-kreo-success/10 text-kreo-success text-xs font-bold rounded uppercase tracking-wider">Active</span>
              </div>
              
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2 text-kreo-ink/70">
                  <span className="w-4 flex justify-center">📧</span>
                  <span className="truncate">{client.email || 'No email'}</span>
                </div>
                <div className="flex items-center gap-2 text-kreo-ink/70">
                  <span className="w-4 flex justify-center">📱</span>
                  <span>{client.phone || 'No phone'}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm border-t border-kreo-ink/10 pt-4">
                <div>
                  <p className="text-kreo-ink/50 mb-0.5 text-xs">Lifetime Value</p>
                  <p className="font-semibold">UGX 0</p>
                </div>
                <div className="text-right">
                  <p className="text-kreo-ink/50 mb-0.5 text-xs">Active Projects</p>
                  <p className="font-medium">0</p>
                </div>
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}
