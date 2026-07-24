import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8"
          style={{ background: 'var(--background)' }}>
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
          ScriptFlow
        </h1>
        <p className="text-xl mb-8" style={{ color: 'var(--muted-foreground)' }}>
          AI-powered screenwriting. Write, collaborate, and bring your stories to life.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/login"
                className="px-6 py-3 rounded-lg font-semibold text-white transition-colors"
                style={{ background: 'var(--primary)' }}>
            Sign In
          </Link>
          <Link href="/auth/signup"
                className="px-6 py-3 rounded-lg font-semibold border transition-colors"
                style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}>
            Get Started
          </Link>
        </div>
      </div>
    </main>
  )
}
