import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4" style={{background:'#0a0a0f'}}>
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl font-bold mb-4" style={{color:'#6366f1'}}>
          ScriptFlow
        </h1>
        <p className="text-xl mb-8" style={{color:'#a0a0b8'}}>
          AI-powered screenwriting. Write, collaborate, and perfect your screenplay with intelligent assistance.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/signup" className="px-6 py-3 rounded-lg font-semibold text-white" style={{background:'#6366f1'}}>
            Get Started Free
          </Link>
          <Link href="/login" className="px-6 py-3 rounded-lg font-semibold border" style={{borderColor:'#2a2a3a',color:'#a0a0b8'}}>
            Sign In
          </Link>
        </div>
        <p className="mt-8 text-sm" style={{color:'#7070a0'}}>
          Built on Supabase • Powered by AI • Your scripts, your ownership
        </p>
      </div>
    </main>
  )
}
