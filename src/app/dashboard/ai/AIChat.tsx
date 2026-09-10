'use client';

import { useState, useEffect, useRef } from 'react';
import { askKAI } from '@/actions/ai';

export default function AIChat({ initialMessage }: { initialMessage: string }) {
  const [messages, setMessages] = useState<{role: 'ai' | 'user', content: string}[]>([
    { role: 'ai', content: initialMessage }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    const response = await askKAI(userMessage);
    
    setMessages(prev => [...prev, { 
      role: 'ai', 
      content: response.success ? (response.message || '') : (response.error || 'Error')
    }]);
    setIsTyping(false);
  };

  return (
    <>
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${msg.role === 'ai' ? 'bg-kreo-signal text-kreo-ink' : 'bg-kreo-ink text-kreo-surface'}`}>
              {msg.role === 'ai' ? 'K' : 'U'}
            </div>
            <div className={`${msg.role === 'ai' ? 'bg-kreo-ink/5 rounded-tl-none' : 'bg-kreo-ink text-kreo-surface rounded-tr-none'} p-4 rounded-2xl max-w-[80%] whitespace-pre-wrap`}>
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-kreo-signal text-kreo-ink rounded-full flex items-center justify-center font-bold text-sm shrink-0">K</div>
            <div className="bg-kreo-ink/5 p-4 rounded-2xl rounded-tl-none max-w-[80%] text-kreo-ink/50 text-sm">
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-kreo-ink/10 bg-kreo-surface">
        <form onSubmit={handleSubmit} className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask KAI to generate quotes, draft emails, or analyze finances..." 
            className="w-full pl-4 pr-12 py-3 bg-kreo-panel border border-kreo-ink/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-kreo-amber shadow-sm"
          />
          <button type="submit" disabled={!input.trim() || isTyping} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-kreo-ink text-kreo-surface rounded-lg hover:bg-black transition-colors disabled:opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </form>
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          <button onClick={() => setInput('Analyze profitability')} className="shrink-0 px-3 py-1.5 bg-kreo-ink/5 hover:bg-kreo-ink/10 rounded-full text-xs font-medium text-kreo-ink/70">Analyze profitability</button>
          <button onClick={() => setInput('Draft a reminder for overdue invoices')} className="shrink-0 px-3 py-1.5 bg-kreo-ink/5 hover:bg-kreo-ink/10 rounded-full text-xs font-medium text-kreo-ink/70">Draft a reminder</button>
          <button onClick={() => setInput('What are my priority tasks?')} className="shrink-0 px-3 py-1.5 bg-kreo-ink/5 hover:bg-kreo-ink/10 rounded-full text-xs font-medium text-kreo-ink/70">List priority tasks</button>
        </div>
      </div>
    </>
  );
}
