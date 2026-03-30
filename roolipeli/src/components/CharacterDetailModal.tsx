import React from 'react'
import { X, Edit2, Sword, Shield, Zap, Heart, Brain } from 'lucide-react'
import { CharacterData } from './CharacterCard'

const ALL_SKILLS: Record<string, { nimi: string; perus: number }[]> = {
  'Ketteryys':      [
    { nimi: 'Heitto', perus: 25 }, { nimi: 'Hyppy', perus: 25 }, { nimi: 'Kiipeily', perus: 40 },
    { nimi: 'Ratsastus', perus: 5 }, { nimi: 'Uinti', perus: 15 }, { nimi: 'Veneily', perus: 5 }, { nimi: 'Väistö', perus: 5 },
  ],
  'Kommunikointi':  [
    { nimi: 'Kielen puhuminen (oma)', perus: 30 }, { nimi: 'Kielen puhuminen (vieras)', perus: 0 },
    { nimi: 'Laulu', perus: 5 }, { nimi: 'Puhetaito', perus: 5 }, { nimi: 'Suostuttelu', perus: 5 },
  ],
  'Tieto':          [
    { nimi: 'Ammatti', perus: 10 }, { nimi: 'Arvon arviointi', perus: 5 }, { nimi: 'Aseeton taistelu', perus: 0 },
    { nimi: 'Ensiapu', perus: 10 }, { nimi: 'Laivankäsittely', perus: 0 }, { nimi: 'Lue/kirjoita kieli', perus: 0 },
    { nimi: 'Eläintieto', perus: 5 }, { nimi: 'Ihmistieto', perus: 5 }, { nimi: 'Kasvitieto', perus: 5 },
    { nimi: 'Mineraalitieto', perus: 5 }, { nimi: 'Yleistieto', perus: 5 },
  ],
  'Manipulointi':   [
    { nimi: 'Kätke', perus: 5 }, { nimi: 'Laadi', perus: 5 },
    { nimi: 'Silmänkääntö', perus: 5 }, { nimi: 'Soita instrumentti', perus: 0 },
  ],
  'Havainto':       [
    { nimi: 'Etsintä', perus: 25 }, { nimi: 'Havaitse', perus: 25 },
    { nimi: 'Jäljitys', perus: 5 }, { nimi: 'Kuuntelu', perus: 25 },
  ],
  'Salavihkaisuus': [
    { nimi: 'Hiipiminen', perus: 10 }, { nimi: 'Piileskely', perus: 10 },
  ],
  'Taikuus':        [
    { nimi: 'Seremonia', perus: 0 }, { nimi: 'Kutsuminen', perus: 0 }, { nimi: 'Intensiteetti', perus: 0 },
  ],
}

const PROFESSION_THEME: Record<string, any> = {
  'soturi':     { accent: '#e05555', from: '#3d1a1a', to: '#1a0c0c', border: '#7a2020' },
  'pappi':      { accent: '#a07dd6', from: '#2a1a3d', to: '#140c1a', border: '#5a3a7a' },
  'parantaja':  { accent: '#a07dd6', from: '#2a1a3d', to: '#140c1a', border: '#5a3a7a' },
  'kauppias':   { accent: '#c9a84c', from: '#3d2e10', to: '#1a1408', border: '#7a6020' },
  'metsästäjä': { accent: '#3d8f42', from: '#0f2e10', to: '#071409', border: '#1e5220' },
  'varas':      { accent: '#6a8fa8', from: '#1a2530', to: '#0c1218', border: '#304050' },
  'tutkija':    { accent: '#5aaecc', from: '#1a2e3d', to: '#0c1820', border: '#2a5570' },
}
const DEFAULT_THEME = { accent: '#d4f0d5', from: '#1a3d1b', to: '#0e2410', border: '#2d5a2e' }

function getTheme(ammatti: string) {
  const lower = (ammatti || '').toLowerCase()
  for (const [key, theme] of Object.entries(PROFESSION_THEME)) {
    if (lower.includes(key)) return theme
  }
  return DEFAULT_THEME
}

function StatBlock({ label, value, icon: Icon, color = 'text-rune' }: any) {
  return (
    <div className="flex flex-col items-center p-2 rounded-xl bg-black/20 border border-white/5">
      {Icon && <Icon size={13} className={`${color} mb-1`} />}
      <span className={`font-mono text-base font-bold leading-none ${color}`}>{value ?? '—'}</span>
      <span className="text-forest-400 text-xs font-mono mt-1">{label}</span>
    </div>
  )
}

function Section({ title, children, accent }: any) {
  return (
    <div className="mb-6">
      <h4 className="font-display text-sm tracking-widest uppercase mb-3 pb-1.5 border-b"
          style={{ color: accent, borderColor: accent + '30' }}>
        {title}
      </h4>
      {children}
    </div>
  )
}

interface Props {
  character: CharacterData
  onClose: () => void
  onEdit: () => void
}

export default function CharacterDetailModal({ character: c, onClose, onEdit }: Props) {
  const theme = getTheme(c.ammatti || '')

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
         style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(7,26,9,0.88)' }}
         onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="relative w-full max-w-6xl my-8 rounded-2xl overflow-hidden border shadow-rune"
           style={{ background: `linear-gradient(160deg, ${theme.from} 0%, ${theme.to} 100%)`, borderColor: theme.border + '80' }}>

        {/* Header */}
        <div className="relative px-12 py-8 border-b" style={{ borderColor: theme.accent + '20' }}>
          <div className="absolute inset-0 opacity-5 bg-forest-grain pointer-events-none" />
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl text-parchment tracking-wider">{c.nimi || 'Nimetön hahmo'}</h2>
              <p className="font-body text-lg italic mt-1" style={{ color: theme.accent }}>
                {c.ammatti || 'Ihminen'}
                {c.sukupuoli && ` · ${c.sukupuoli === 'M' ? 'Mies' : 'Nainen'}`}
                {c.ika && ` · ${c.ika} vuotta`}
              </p>
              {c.pelaaja && <p className="text-forest-400 text-base font-mono mt-1">Pelaaja: {c.pelaaja}</p>}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={onEdit}
                className="p-2.5 rounded-xl border border-forest-600/50 text-forest-400
                           hover:text-parchment hover:border-rune/50 transition-all bg-black/20">
                <Edit2 size={18} />
              </button>
              <button type="button" onClick={onClose}
                className="p-2.5 rounded-xl border border-forest-600/50 text-forest-400
                           hover:text-parchment hover:border-red-700/50 transition-all bg-black/20">
                <X size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="px-12 py-8">

          {/* Basic info and attributes side by side */}
          <div className="grid grid-cols-2 gap-10 mb-6">
            <Section title="Perustiedot" accent={theme.accent}>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {([
                  ['Kulttuuri',           c.kulttuuri],
                  ['Kultti',              c.kultti],
                  ['Uskonnollinen rooli', c.uskonnollinenRooli],
                  ['Kotimaa / Heimo',     c.kotimaa],
                  ['Isän ammatti',        c.isanAmmatti],
                  ['Äidin ammatti',       c.aidanAmmatti],
                ] as [string, string][]).filter(([, v]) => !!v).map(([label, val]) => (
                  <div key={label}>
                    <span className="text-forest-500 block text-xs font-mono mb-0.5">{label}</span>
                    <span className="text-parchment text-sm font-body">{val}</span>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Ominaisuudet" accent={theme.accent}>
              <div className="grid grid-cols-4 gap-2">
                {[['VMA', c.VMA], ['R-R', c.RR], ['KOK', c.KOK], ['ÄLY', c.ALY],
                  ['MHT', c.MHT], ['NPP', c.NPP], ['ULK', c.ULK]].map(([label, val]) => (
                  <div key={label as string} className="text-center p-2 rounded-xl bg-black/20 border border-white/5">
                    <div className="font-mono text-lg font-bold" style={{ color: theme.accent }}>{val ?? '—'}</div>
                    <div className="text-forest-400 text-xs font-mono mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* Derived stats */}
          <Section title="Johdetut arvot" accent={theme.accent}>
            <div className="grid grid-cols-6 gap-2 mb-3">
              <StatBlock label="Vahinko" value="—"    icon={Sword} />
              <StatBlock label="Liike"   value="3"    icon={Zap} />
              <StatBlock label="IH"      value={c.IH} icon={Zap}    color="text-yellow-400" />
              <StatBlock label="KP"      value={c.KP} icon={Heart}  color="text-red-400" />
              <StatBlock label="TP"      value={c.TP} icon={Brain}  color="text-blue-400" />
              <StatBlock label="VP"      value="—"    icon={Shield} color="text-orange-400" />
            </div>
          </Section>

          {/* All skills by category */}
          <Section title="Kaikki kyvyt" accent={theme.accent}>
            <div className="grid grid-cols-2 gap-x-12">
              {Object.entries(ALL_SKILLS).map(([category, skillList]) => (
                <div key={category} className="mb-4">
                  <p className="font-display text-xs tracking-widest uppercase mb-1.5"
                     style={{ color: theme.accent }}>
                    {category}
                  </p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs font-mono">
                    {skillList.map(({ nimi, perus }) => {
                      const learned = (c.kyvyt?.[nimi] || 0) as number
                      const total = perus + learned
                      return (
                        <div key={nimi} className="flex justify-between gap-2">
                          <span className="text-forest-400 truncate">{nimi}</span>
                          <span className={`font-bold ${learned > 0 ? '' : 'text-forest-600'}`}
                                style={{ color: learned > 0 ? theme.accent : undefined }}>
                            {total}%
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Background */}
          {c.tausta && (
            <Section title="Tausta" accent={theme.accent}>
              <p className="font-body text-forest-300 text-sm italic leading-relaxed">{c.tausta}</p>
            </Section>
          )}
        </div>
      </div>
    </div>
  )
}
