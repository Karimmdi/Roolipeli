import React from 'react'
import { AlertTriangle, X } from 'lucide-react'

interface Props {
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmModal({ title, message, onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4"
         style={{ backdropFilter: 'blur(4px)', backgroundColor: 'rgba(7,26,9,0.8)' }}>
      <div className="w-full max-w-sm rounded-2xl border border-forest-600/50 overflow-hidden"
           style={{ background: 'linear-gradient(160deg, #0e1f0f 0%, #071a09 100%)' }}>
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-red-900/40 border border-red-700/50">
              <AlertTriangle size={20} className="text-red-400" />
            </div>
            <h3 className="font-display text-parchment text-lg tracking-wide">{title}</h3>
          </div>
          <button type="button" onClick={onCancel} className="text-forest-500 hover:text-forest-300">
            <X size={18} />
          </button>
        </div>
        <div className="px-6 pb-6">
          <p className="font-body text-forest-300 text-base leading-relaxed mb-6">{message}</p>
          <div className="flex gap-3">
            <button type="button" onClick={onCancel}
              className="flex-1 py-2.5 rounded-xl border border-forest-600 text-forest-400
                         hover:border-forest-400 hover:text-parchment font-display text-sm tracking-widest transition-all">
              Peruuta
            </button>
            <button type="button" onClick={onConfirm}
              className="flex-1 py-2.5 rounded-xl font-display text-sm tracking-widest transition-all
                         bg-red-900/60 border border-red-700 text-red-200 hover:bg-red-800/60">
              Poista
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
