import Link from 'next/link';
import { getTeamMembers } from '@/actions/team';
import AddMemberButton from './AddMemberButton';

export default async function TeamPage() {
  const { members = [], businessId } = await getTeamMembers();
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team</h1>
          <p className="text-kreo-ink/60 mt-1">Manage users, roles, and permissions within this business.</p>
        </div>
        {businessId && <AddMemberButton businessId={businessId} />}
      </header>

      <div className="bg-kreo-panel rounded-2xl shadow-sm border border-kreo-ink/10 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-kreo-ink/10 bg-kreo-ink/5">
              <th className="py-3 px-5 text-xs font-semibold text-kreo-ink/60 uppercase tracking-wider">Member</th>
              <th className="py-3 px-5 text-xs font-semibold text-kreo-ink/60 uppercase tracking-wider">Role</th>
              <th className="py-3 px-5 text-xs font-semibold text-kreo-ink/60 uppercase tracking-wider">Joined</th>
              <th className="py-3 px-5 text-right text-xs font-semibold text-kreo-ink/60 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-kreo-ink/5 text-sm">
            {members.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-kreo-ink/50">No team members found.</td>
              </tr>
            ) : (
              members.map((member: any) => (
                <tr key={member.id} className="hover:bg-kreo-ink/5 transition-colors group">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-kreo-ink text-kreo-surface rounded-full flex items-center justify-center font-bold text-sm">
                        {member.user?.name ? member.user.name[0].toUpperCase() : member.user?.email[0].toUpperCase()}
                      </div>
                      <div>
                        <span className="block font-medium">{member.user?.name || 'Unnamed User'}</span>
                        <span className="text-xs text-kreo-ink/60">{member.user?.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <span className="px-2 py-1 bg-kreo-ink/10 text-kreo-ink text-xs font-bold rounded uppercase tracking-wider">{member.role}</span>
                  </td>
                  <td className="py-4 px-5 text-kreo-ink/70">{new Date(member.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 px-5 text-right">
                    {member.role !== 'OWNER' && (
                      <button className="text-kreo-ink/50 hover:text-kreo-ink font-medium">Manage</button>
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
