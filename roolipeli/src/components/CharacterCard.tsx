import React from 'react'
import { Zap, Heart, Brain, Trash2, Edit2 } from 'lucide-react'
import { KYVYT_LISTA, calculateCategoryBonus, KykyKategoria } from '../utils/kyvyt'

const PROFESSION_GROUPS = [
  {
    keywords: ['soturi', 'ritari', 'vartija', 'sotilas', 'taistelija'],
    theme: { accent: '#e05555', from: '#3d1a1a', to: '#1a0c0c', border: '#7a2020' },
    symbol: '⚔',
  },
  {
    keywords: ['pappi', 'shamaani', 'velho', 'maagi', 'akolyytti', 'parantaja'],
    theme: { accent: '#a07dd6', from: '#2a1a3d', to: '#140c1a', border: '#5a3a7a' },
    symbol: '✦',
  },
  {
    keywords: ['kauppias', 'seppä', 'käsityöläinen', 'räätäli'],
    theme: { accent: '#c9a84c', from: '#3d2e10', to: '#1a1408', border: '#7a6020' },
    symbol: '⚖',
  },
  {
    keywords: ['metsästäjä', 'paimen', 'talonpoika', 'kalastaja'],
    theme: { accent: '#3d8f42', from: '#0f2e10', to: '#071409', border: '#1e5220' },
    symbol: '🌿',
  },
  {
    keywords: ['varas', 'salamurhaaja', 'tiedustelija'],
    theme: { accent: '#6a8fa8', from: '#1a2530', to: '#0c1218', border: '#304050' },
    symbol: '🗡',
  },
  {
    keywords: ['tutkija', 'kirjuri', 'lääkäri', 'oppinut'],
    theme: { accent: '#5aaecc', from: '#1a2e3d', to: '#0c1820', border: '#2a5570' },
    symbol: '📜',
  },
]

const DEFAULT_THEME = { accent: '#d4f0d5', from: '#1a3d1b', to: '#0e2410', border: '#2d5a2e' }
const DEFAULT_SYMBOL = '⚜'

function getTheme(ammatti: string) {
  const lower = (ammatti || '').toLowerCase()
  for (const g of PROFESSION_GROUPS) {
    if (g.keywords.some(k => lower.includes(k))) return { theme: g.theme, symbol: g.symbol }
  }
  return { theme: DEFAULT_THEME, symbol: DEFAULT_SYMBOL }
}


export interface CharacterData {
  id: string
  nimi: string
  pelaaja?: string
  ammatti?: string
  kulttuuri?: string
  kultti?: string
  sukupuoli?: string
  ika?: string
  kotimaa?: string
  isanAmmatti?: string
  aidanAmmatti?: string
  uskonnollinenRooli?: string
  tausta?: string
  VMA?: number; RR?: number; KOK?: number; ALY?: number
  MHT?: number; NPP?: number; ULK?: number
  KP?: number; TP?: number; IH?: number
  vahinkomuutos?: string
  liike?: number
  vasymyspisteet?: number
  kestopisteetKohdittain?: { jalat: number; vatsa: number; rinta: number; kadet: number; paa: number }
  kyvyt?: Record<string, number>
  valitutMeleeAseet?: string[]
  valitutHeittoAseet?: string[]
  valitutHenkitaikuudet?: string[]
  valitutRiimutaikuudet?: string[]
}

interface CharacterCardProps {
  character: CharacterData
  onOpenDetail: (c: CharacterData) => void
  onEdit: (c: CharacterData) => void
  onDelete: (id: string) => void
}

export default function CharacterCard({ character: c, onOpenDetail, onEdit, onDelete }: CharacterCardProps) {
  const { theme, symbol } = getTheme(c.ammatti || '')

  return (
    <div
      className="relative rounded-2xl overflow-hidden border cursor-pointer
                 transition-all duration-200 hover:scale-[1.02] hover:shadow-rune group"
      style={{
        background: `linear-gradient(160deg, ${theme.from} 0%, ${theme.to} 100%)`,
        borderColor: theme.border + '60',
        boxShadow: '0 2px 16px rgba(0,0,0,0.4)',
      }}
      onClick={() => onOpenDetail(c)}
    >
      <div className="absolute inset-0 opacity-5 bg-forest-grain pointer-events-none" />

      {/* Edit and delete — visible on hover */}
      <div className="absolute top-3 right-3 flex gap-1.5 z-10
                      opacity-0 group-hover:opacity-100 transition-opacity"
           onClick={e => e.stopPropagation()}>
        <button type="button" onClick={() => onEdit(c)}
          className="p-1.5 rounded-lg bg-black/40 border border-white/10
                     text-forest-400 hover:text-parchment transition-all">
          <Edit2 size={13} />
        </button>
        <button type="button" onClick={() => onDelete(c.id)}
          className="p-1.5 rounded-lg bg-black/40 border border-white/10
                     text-forest-400 hover:text-red-400 transition-all">
          <Trash2 size={13} />
        </button>
      </div>

      <div className="p-5">
        {/* Symbol and name */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border"
               style={{ borderColor: theme.accent + '40', backgroundColor: theme.accent + '18' }}>
            {symbol}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-parchment text-lg leading-tight tracking-wide truncate pr-14">
              {c.nimi || 'Nimetön hahmo'}
            </h3>
            <p className="font-body text-sm italic leading-snug mt-0.5 truncate"
               style={{ color: theme.accent }}>
              {c.ammatti || 'Ihminen'}
              {c.sukupuoli && ` · ${c.sukupuoli === 'M' ? '♂' : '♀'}`}
              {c.ika && ` · ${c.ika}v`}
            </p>
            <p className="text-forest-600 text-xs font-mono mt-0.5 truncate">
              {[c.kulttuuri, c.kultti].filter(Boolean).join(' · ')}
            </p>
            {c.pelaaja && (
              <p className="text-forest-700 text-xs font-mono mt-0.5 truncate">
                Pelaaja: {c.pelaaja}
              </p>
            )}
          </div>
        </div>

        {/* Attribute row */}
        <div className="grid grid-cols-7 gap-1 mb-4 py-3 px-2 rounded-xl bg-black/20 border border-white/5">
          {[
            ['VMA', c.VMA], ['R-R', c.RR], ['KOK', c.KOK], ['ÄLY', c.ALY],
            ['MHT', c.MHT], ['NPP', c.NPP], ['ULK', c.ULK],
          ].map(([label, val]) => (
            <div key={label as string} className="text-center">
              <div className="font-mono text-base font-bold leading-none" style={{ color: theme.accent }}>
                {val ?? '—'}
              </div>
              <div className="text-forest-700 text-xs font-mono mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[
            { label: 'KP', value: c.KP,  icon: Heart, color: 'text-red-400'    },
            { label: 'TP', value: c.TP,  icon: Brain, color: 'text-blue-400'   },
            { label: 'IH', value: c.IH,  icon: Zap,   color: 'text-yellow-400' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-black/20">
              <Icon size={11} className={color} />
              <span className="text-forest-500 font-mono text-xs">{label}</span>
              <span className={`font-mono font-bold ml-auto text-xs ${color}`}>{value ?? '—'}</span>
            </div>
          ))}
        </div>

        {/* Vahinkomuutos */}
        {c.vahinkomuutos && (
          <div className="flex items-center gap-2 mb-3 px-2">
            <span className="text-forest-500 text-xs font-mono">Vahinkomuutos:</span>
            <span className="font-mono text-xs font-bold" style={{ color: theme.accent }}>{c.vahinkomuutos}</span>
          </div>
        )}

        {/* HP bar */}
        {(c.KP ?? 0) > 0 && (
          <div className="mb-3">
            <div className="flex justify-between text-xs font-mono text-forest-600 mb-1">
              <span>KP</span><span>{c.KP}</span>
            </div>
            <div className="h-1.5 bg-forest-900 rounded-full overflow-hidden">
              <div className="h-full bg-red-500/60 rounded-full w-full" />
            </div>
          </div>
        )}

        {KYVYT_LISTA.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-3 text-xs font-mono">
            {KYVYT_LISTA
              .map(({ nimi, perus, kategoria }) => {
                const learned = c.kyvyt?.[nimi] || 0
                const bonus = calculateCategoryBonus(
                  { VMA: c.VMA, RR: c.RR, KOK: c.KOK, ALY: c.ALY, MHT: c.MHT, NPP: c.NPP, ULK: c.ULK },
                  kategoria as KykyKategoria,
                )
                const total = Math.max(0, perus + learned + bonus)
                return { nimi, total, learned, bonus }
              })
              .sort((a, b) => b.total - a.total)
              .slice(0, 3)
              .map(skill => (
                <div key={skill.nimi} className="text-center p-2 rounded-xl bg-black/20 border border-white/5">
                  <div className="font-mono text-base font-bold" style={{ color: theme.accent }}>
                    {skill.total}%
                  </div>
                  <div className="text-forest-500 mt-0.5 truncate">{skill.nimi}</div>
                </div>
              ))}
          </div>
        )}

        <p className="text-center text-forest-700 text-xs font-mono mt-2 group-hover:text-forest-500 transition-colors">
          Klikkaa avataksesi ↗
        </p>
      </div>
    </div>
  )
}
