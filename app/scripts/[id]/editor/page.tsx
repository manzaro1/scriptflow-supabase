'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase'
import { useParams } from 'next/navigation'

const SCENE_LABELS = ['EXT.', 'INT.', 'I/E.']

export default function EditorPage() {
  const { id } = useParams()
  const [script, setScript] = useState<any>(null)
  const [blocks, setBlocks] = useState<any[]>([])
  const [currentLabel, setCurrentLabel] = useState('EXT.')
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  const loadScript = useCallback(async () => {
    const [scriptRes, blocksRes] = await Promise.all([
      supabase.from('scripts').select('*').eq('id', id).single(),
      supabase.from('script_blocks').select('*').eq('script_id', id).order('order_index')
    ])
    if (scriptRes.data) setScript(scriptRes.data)
    setBlocks(blocksRes.data || [])
  }, [id])

  useEffect(() => { loadScript() }, [loadScript])

  const addBlock = async (type: 'scene' | 'action' | 'character' | 'dialogue') => {
    const { data: { user } } = await supabase.auth.getUser()
    const { data: newBlock } = await supabase.from('script_blocks').insert({
      script_id: id, type, order_index: blocks.length, scene_label: type === 'scene' ? currentLabel : null
    }).select().single()
    if (newBlock) setBlocks([...blocks, newBlock])
  }

  const updateBlock = async (blockId: string, content: string) => {
    setBlocks(blocks.map(b => b.id === blockId ? { ...b, content } : b))
    await supabase.from('script_blocks').update({ content }).eq('id', blockId)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-800 bg-gray-900">
        <input
          className="bg-transparent text-xl font-bold border-b border-transparent hover:border-gray-600 focus:border-indigo-500 outline-none px-2 py-1"
          value={script?.title || ''}
          onChange={async e => {
            setScript({ ...script, title: e.target.value })
            await supabase.from('scripts').update({ title: e.target.value }).eq('id', id)
          }}
          placeholder="Script title..."
        />
        <div className="flex gap-3">
          {['EXT.', 'INT.', 'I/E.'].map(l => (
            <button key={l} onClick={() => setCurrentLabel(l)} className={`text-xs px-3 py-1 rounded ${currentLabel === l ? 'bg-indigo-600' : 'bg-gray-700'}`}>{l}</button>
          ))}
          <button onClick={() => addBlock('scene')} className="bg-gray-700 hover:bg-gray-600 text-xs px-3 py-1 rounded">+ Scene</button>
          <button onClick={() => addBlock('action')} className="bg-gray-700 hover:bg-gray-600 text-xs px-3 py-1 rounded">+ Action</button>
          <button onClick={() => addBlock('character')} className="bg-gray-700 hover:bg-gray-600 text-xs px-3 py-1 rounded">+ Character</button>
          <button onClick={() => addBlock('dialogue')} className="bg-gray-700 hover:bg-gray-600 text-xs px-3 py-1 rounded">+ Dialogue</button>
        </div>
      </div>

      {/* Script content */}
      <div className="flex-1 overflow-y-auto px-48 py-8">
        <div className="max-w-3xl mx-auto space-y-1">
          {blocks.map(block => {
            if (block.type === 'scene') return (
              <div key={block.id} className="mt-6 mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-indigo-400 w-8">{block.scene_label || 'EXT.'}</span>
                  <input
                    className="flex-1 bg-transparent font-bold text-lg uppercase border-b border-gray-700 focus:border-indigo-500 outline-none py-1"
                    value={block.content || ''}
                    onChange={e => updateBlock(block.id, e.target.value)}
                    placeholder="LOCATION - TIME"
                  />
                </div>
              </div>
            )
            if (block.type === 'action') return (
              <textarea
                key={block.id}
                className="w-full bg-transparent text-sm leading-relaxed resize-none border-b border-gray-800 focus:border-indigo-500 outline-none py-2 min-h-[60px]"
                value={block.content || ''}
                onChange={e => updateBlock(block.id, e.target.value)}
                placeholder="Action description..."
              />
            )
            if (block.type === 'character') return (
              <div key={block.id} className="text-center uppercase text-sm font-bold tracking-widest text-indigo-300 py-2">
                <input
                  className="bg-transparent text-center uppercase text-sm font-bold tracking-widest text-indigo-300 outline-none w-full"
                  value={block.content || ''}
                  onChange={e => updateBlock(block.id, e.target.value)}
                  placeholder="CHARACTER NAME"
                />
              </div>
            )
            if (block.type === 'dialogue') return (
              <div key={block.id} className="px-16">
                <textarea
                  className="w-full bg-transparent text-sm leading-relaxed resize-none border-b border-gray-800 focus:border-indigo-500 outline-none py-2 text-center"
                  value={block.content || ''}
                  onChange={e => updateBlock(block.id, e.target.value)}
                  placeholder="Dialogue..."
                />
              </div>
            )
            return null
          })}
        </div>
      </div>
    </div>
  )
}