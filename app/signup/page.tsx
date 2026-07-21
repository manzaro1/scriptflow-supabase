'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } }
    })
    if (!error) router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <form onSubmit={handleSignup} className="bg-gray-900 p-8 rounded-xl w-96 space-y-4">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <input className="w-full bg-gray-800 rounded px-4 py-2" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
        <input className="w-full bg-gray-800 rounded px-4 py-2" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full bg-gray-800 rounded px-4 py-2" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="w-full bg-indigo-600 hover:bg-indigo-500 py-2 rounded font-medium">Sign Up</button>
      </form>
    </div>
  )
}