import Link from 'next/link';

export default function KAIPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto flex flex-col h-[calc(100vh-80px)]">
      <header className="flex items-center justify-between mb-8 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-kreo-signal text-kreo-ink rounded-full flex items-center justify-center font-bold text-xl">K</div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">KAI Assistant</h1>
            <p className="text-kreo-ink/60 mt-1">Your creative business copilot.</p>
          </div>
        </div>
      </header>

      <div className="flex-1 bg-kreo-panel rounded-2xl shadow-sm border border-kreo-ink/10 overflow-hidden flex flex-col">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-kreo-signal text-kreo-ink rounded-full flex items-center justify-center font-bold text-sm shrink-0">K</div>
            <div className="bg-kreo-ink/5 p-4 rounded-2xl rounded-tl-none max-w-[80%]">
              <p className="text-sm">Hello! I've analyzed your upcoming week. You have 2 projects at risk of missing deadlines, and 1 invoice that is overdue from Sarah K.</p>
              <p className="text-sm mt-2">Would you like me to draft a gentle reminder email for Sarah, or help you re-prioritize your tasks?</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 flex-row-reverse">
            <div className="w-8 h-8 bg-kreo-ink text-kreo-surface rounded-full flex items-center justify-center font-bold text-sm shrink-0">J</div>
            <div className="bg-kreo-ink text-kreo-surface p-4 rounded-2xl rounded-tr-none max-w-[80%]">
              <p className="text-sm">Draft the email to Sarah please.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-kreo-signal text-kreo-ink rounded-full flex items-center justify-center font-bold text-sm shrink-0">K</div>
            <div className="bg-kreo-ink/5 p-4 rounded-2xl rounded-tl-none max-w-[80%]">
              <p className="text-sm mb-3">Here is a draft for Sarah regarding the overdue invoice INV-2026-004:</p>
              <div className="bg-white p-3 rounded border border-kreo-ink/10 text-xs font-mono mb-3">
                Subject: Reminder: Outstanding Invoice INV-2026-004<br/><br/>
                Hi Sarah,<br/><br/>
                I hope you're having a great week! I'm just following up on invoice INV-2026-004 for UGX 1,500,000, which was due on Oct 01, 2026.<br/><br/>
                Please let me know if you have any questions or need me to resend the invoice.<br/><br/>
                Best,<br/>
                John
              </div>
              <div className="flex gap-2 mt-2">
                <button className="px-3 py-1.5 bg-kreo-ink text-kreo-surface rounded text-xs font-medium hover:bg-black">Send via Email</button>
                <button className="px-3 py-1.5 bg-kreo-panel border border-kreo-ink/20 rounded text-xs font-medium hover:bg-kreo-ink/5">Copy to Clipboard</button>
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-kreo-ink/10 bg-kreo-surface">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Ask KAI to generate quotes, draft emails, or analyze finances..." 
              className="w-full pl-4 pr-12 py-3 bg-kreo-panel border border-kreo-ink/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-kreo-amber shadow-sm"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-kreo-ink text-kreo-surface rounded-lg hover:bg-black transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
            <button className="shrink-0 px-3 py-1.5 bg-kreo-ink/5 hover:bg-kreo-ink/10 rounded-full text-xs font-medium text-kreo-ink/70">Analyze profitability</button>
            <button className="shrink-0 px-3 py-1.5 bg-kreo-ink/5 hover:bg-kreo-ink/10 rounded-full text-xs font-medium text-kreo-ink/70">Draft a proposal</button>
            <button className="shrink-0 px-3 py-1.5 bg-kreo-ink/5 hover:bg-kreo-ink/10 rounded-full text-xs font-medium text-kreo-ink/70">Summarize client notes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
