import AIChat from './AIChat';
import { getAIInitialInsights } from '@/actions/ai';

export default async function KAIPage() {
  const result = await getAIInitialInsights();
  const initialMessage = result.success && result.message 
    ? result.message 
    : "Hello! I'm your KREO assistant.";

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
        <AIChat initialMessage={initialMessage} />
      </div>
    </div>
  );
}
