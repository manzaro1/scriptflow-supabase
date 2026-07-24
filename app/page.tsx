import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <main className="min-h-screen flex flex-col" style={{background: 'var(--background)', color: 'var(--foreground)'}}>
      <header className="w-full p-6 flex items-center justify-between" style={{borderBottom: '1px solid var(--border)'}}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold" style={{background: 'var(--primary)'}}>S</div>
          <span className="text-xl font-bold">ScriptFlow</span>
        </div>
        <nav className="flex gap-4 items-center">
          {user ? (
            <Link href="/dashboard" className="px-4 py-2 rounded-lg font-medium transition" style={{background: 'var(--primary)', color: 'var(--primary-foreground)'}}>
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 rounded-lg transition" style={{color: 'var(--muted-foreground)'}}>Sign In</Link>
              <Link href="/signup" className="px-4 py-2 rounded-lg font-medium transition" style={{background: 'var(--primary)', color: 'var(--primary-foreground)'}}>Get Started</Link>
            </>
          )}
        </nav>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-6xl font-bold mb-4" style={{background: 'linear-gradient(135deg, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
          Write Your Story with AI
        </h1>
        <p className="text-xl mb-8 max-w-2xl" style={{color: 'var(--muted-foreground)'}}>
          ScriptFlow is a professional screenwriting platform powered by AI. 
          Collaborate with your team, get intelligent suggestions, and bring your stories to life.
        </p>
        <div className="flex gap-4">
          <Link href="/signup" className="px-8 py-3 rounded-xl font-bold text-lg transition hover:opacity-90" style={{background: 'var(--primary)', color: 'var(--primary-foreground)'}}>
            Start Free Today
          </Link>
          <Link href="/login" className="px-8 py-3 rounded-xl font-medium text-lg transition" style={{border: '1px solid var(--border)', color: 'var(--muted-foreground)'}}>
            Sign In
          </Link>
        </div>
      </section>

      <footer className="p-6 text-center" style={{color: 'var(--muted-foreground)', borderTop: '1px solid var(--border)'}}>
        <p>&copy; {new Date().getFullYear()} ScriptFlow. Built with Supabase.</p>
      </footer>
    </main>
  )
}
