import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-kreo-surface text-kreo-ink font-sans flex flex-col">
      {/* Navigation */}
      <header className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-kreo-ink rounded-sm flex items-center justify-center text-kreo-surface font-bold text-xl">K</div>
          <span className="font-bold text-xl tracking-tight">KREO</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="#how-it-works" className="hover:text-kreo-amber transition-colors">How it works</Link>
          <Link href="#features" className="hover:text-kreo-amber transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-kreo-amber transition-colors">Pricing</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-kreo-amber transition-colors">Log in</Link>
          <Link href="/register" className="bg-kreo-ink text-kreo-surface px-5 py-2.5 rounded-full text-sm font-medium hover:bg-black transition-colors">
            Start free
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 mt-20 mb-32 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-6">
          MAKE THE WORK.<br />
          <span className="text-kreo-amber">RUN THE BUSINESS.</span><br />
          KEEP MOVING.
        </h1>
        <p className="text-lg md:text-xl text-kreo-ink/70 max-w-2xl mb-10">
          KREO brings your clients, projects, money and creative workflow into one place. 
          The Business OS built specifically for African creative professionals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link href="/register" className="bg-kreo-ink text-kreo-surface px-8 py-4 rounded-full text-lg font-medium hover:bg-black transition-transform hover:scale-105 active:scale-95 shadow-xl">
            Start your free business
          </Link>
          <Link href="#how-it-works" className="px-8 py-4 rounded-full text-lg font-medium bg-kreo-ivory text-kreo-ink hover:bg-[#e8e2d5] transition-colors">
            See how it works
          </Link>
        </div>
        
        {/* App Interface Image */}
        <div className="mt-20 relative w-full aspect-[16/9] max-w-4xl mx-auto bg-kreo-panel rounded-2xl shadow-2xl border border-kreo-ink/10 overflow-hidden flex items-center justify-center">
          <Image 
            src="/dashboard-preview.jpg" 
            alt="KREO Dashboard Interface Preview" 
            fill
            className="object-cover"
            priority
          />
        </div>
      </main>

      {/* Sections for anchor links */}
      <section id="how-it-works" className="py-20 px-8 max-w-7xl mx-auto border-t border-kreo-ink/10">
        <h2 className="text-3xl font-bold mb-6">How it works</h2>
        <p className="text-lg text-kreo-ink/70 max-w-2xl">
          Everything you need in one unified platform. From creating quotes to delivering the final product and getting paid.
        </p>
      </section>

      <section id="features" className="py-20 px-8 max-w-7xl mx-auto border-t border-kreo-ink/10">
        <h2 className="text-3xl font-bold mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-kreo-panel rounded-xl">
            <h3 className="font-bold mb-2">Projects & Tasks</h3>
            <p className="text-kreo-ink/70">Keep your deliverables on track and team aligned.</p>
          </div>
          <div className="p-6 bg-kreo-panel rounded-xl">
            <h3 className="font-bold mb-2">Finance & Invoicing</h3>
            <p className="text-kreo-ink/70">Send quotes, convert to invoices, and record expenses seamlessly.</p>
          </div>
          <div className="p-6 bg-kreo-panel rounded-xl">
            <h3 className="font-bold mb-2">Team Management</h3>
            <p className="text-kreo-ink/70">Invite your crew with custom permissions and roles.</p>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-8 max-w-7xl mx-auto border-t border-kreo-ink/10 mb-20">
        <h2 className="text-3xl font-bold mb-6">Pricing</h2>
        <p className="text-lg text-kreo-ink/70 max-w-2xl">
          Start for free, upgrade when your creative business scales. Simple, transparent pricing built for African professionals.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-kreo-ink text-kreo-surface py-12 px-8 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="font-bold text-xl mb-4 tracking-tight">KREO</div>
            <p className="text-kreo-surface/60 text-sm">Your work. Your clients. Your business.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-kreo-surface/60">
              <li><Link href="#features" className="hover:text-kreo-signal">Projects</Link></li>
              <li><Link href="#features" className="hover:text-kreo-signal">Clients</Link></li>
              <li><Link href="#features" className="hover:text-kreo-signal">Money</Link></li>
              <li><Link href="#features" className="hover:text-kreo-signal">KAI</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-kreo-surface/60">
              <li><Link href="#" className="hover:text-kreo-signal">About</Link></li>
              <li><Link href="#" className="hover:text-kreo-signal">Contact</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}


