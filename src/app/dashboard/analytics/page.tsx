import { getAnalytics } from '@/actions/analytics';

export default async function AnalyticsPage() {
  const result = await getAnalytics();
  const data = result.data || { winRate: 0, avgProjectValue: 0, clientRetention: 0, onTimeDelivery: 0 };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pulse</h1>
          <p className="text-kreo-ink/60 mt-1">Analytics and health metrics for your creative business.</p>
        </div>
        <select className="bg-kreo-panel border border-kreo-ink/10 px-4 py-2 rounded-lg text-sm focus:outline-none">
          <option>Last 30 Days</option>
          <option>This Quarter</option>
          <option>This Year</option>
          <option>All Time</option>
        </select>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-kreo-panel rounded-2xl p-5 shadow-sm border border-kreo-ink/10">
          <h3 className="text-sm font-semibold text-kreo-ink/50 uppercase tracking-wider mb-1">Win Rate</h3>
          <p className="text-3xl font-bold">{data.winRate}%</p>
          <p className="text-xs text-kreo-success mt-1">Based on accepted quotes</p>
        </div>
        <div className="bg-kreo-panel rounded-2xl p-5 shadow-sm border border-kreo-ink/10">
          <h3 className="text-sm font-semibold text-kreo-ink/50 uppercase tracking-wider mb-1">Avg Project Value</h3>
          <p className="text-3xl font-bold">UGX {data.avgProjectValue.toLocaleString()}</p>
          <p className="text-xs text-kreo-success mt-1">Across all projects</p>
        </div>
        <div className="bg-kreo-panel rounded-2xl p-5 shadow-sm border border-kreo-ink/10">
          <h3 className="text-sm font-semibold text-kreo-ink/50 uppercase tracking-wider mb-1">Client Retention</h3>
          <p className="text-3xl font-bold">{data.clientRetention}%</p>
          <p className="text-xs text-kreo-ink/50 mt-1">Clients with multiple projects</p>
        </div>
        <div className="bg-kreo-panel rounded-2xl p-5 shadow-sm border border-kreo-ink/10">
          <h3 className="text-sm font-semibold text-kreo-ink/50 uppercase tracking-wider mb-1">On-Time Delivery</h3>
          <p className="text-3xl font-bold">{data.onTimeDelivery}%</p>
          <p className="text-xs text-kreo-success mt-1">Tasks completed by due date</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-kreo-panel rounded-2xl p-6 shadow-sm border border-kreo-ink/10">
          <h2 className="font-semibold mb-6 text-lg">Revenue Growth</h2>
          <div className="w-full h-64 bg-kreo-ink/5 rounded-xl flex items-center justify-center text-kreo-ink/40">
            [Chart Area: Revenue over time]
          </div>
        </div>
        <div className="bg-kreo-panel rounded-2xl p-6 shadow-sm border border-kreo-ink/10">
          <h2 className="font-semibold mb-6 text-lg">Income by Source</h2>
          <div className="w-full h-64 bg-kreo-ink/5 rounded-xl flex items-center justify-center text-kreo-ink/40">
            [Chart Area: Pie Chart showing Services]
          </div>
        </div>
      </div>
    </div>
  );
}
