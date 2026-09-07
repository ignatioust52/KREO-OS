'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { authenticate } from '@/actions/auth';

export default function Login() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <div className="min-h-screen bg-kreo-surface text-kreo-ink font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-kreo-panel rounded-2xl shadow-xl p-8 border border-kreo-ink/10">
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="w-10 h-10 bg-kreo-ink rounded flex items-center justify-center text-kreo-surface font-bold text-2xl mb-4">
            K
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Run the business behind your creativity.</h1>
          <p className="text-sm text-kreo-ink/70 mt-2 text-center">Projects, clients, money and everything in between.</p>
        </div>
        
        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              name="email"
              type="email" 
              required
              className="w-full px-4 py-2 border border-kreo-ink/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-kreo-amber bg-transparent" 
              placeholder="john@example.com" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              name="password"
              type="password" 
              required
              className="w-full px-4 py-2 border border-kreo-ink/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-kreo-amber bg-transparent" 
              placeholder="••••••••" 
            />
          </div>

          {errorMessage && (
            <div className="text-sm text-kreo-danger bg-kreo-danger/10 p-3 rounded-lg">
              {errorMessage}
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={isPending}
            className="w-full bg-kreo-ink text-kreo-surface font-medium py-3 rounded-lg hover:bg-black transition-colors mt-2 disabled:opacity-50"
          >
            {isPending ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <span className="text-kreo-ink/60">Don't have an account? </span>
          <Link href="/register" className="font-medium hover:text-kreo-amber">Start free</Link>
        </div>
      </div>
    </div>
  );
}
