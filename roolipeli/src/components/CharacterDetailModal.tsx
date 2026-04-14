import React from 'react'
import { X, Edit2, Sword, Shield, Zap, Heart, Brain, Wind } from 'lucide-react'
import { CharacterData } from './CharacterCard'
import { calculateCategoryBonus, KykyKategoria } from '../utils/kyvyt'
import meleeData from '../data/meleeaseet.json'
import heittoData from '../data/heittoaseet.json'
import henkiData from '../data/henkitaikuus.json'
import riimuData from '../data/riimutaikuus.json'
import type { MeleeAse, HeittoAse, HenkiTaika, RiimuTaika } from '../data/types'

const MELEE_ASEET   = meleeData  as MeleeAse[]
const HEITTO_ASEET  = heittoData as HeittoAse[]
const HENKI_TAIKUUS = henkiData  as HenkiTaika[]
const RIIMU_TAIKUUS = riimuData  as RiimuTaika[]

// Skill list with category keys — richer than the wizard's editable list
const ALL_SKILLS: { kategoria: KykyKategoria; display: string; skills: { nimi: string; perus: number }[] }[] = [
  { kategoria: 'ketteryys',      display: 'Ketteryys',      skills: [
    { nimi: 'Heitto', perus: 25 }, { nimi: 'Hyppy', perus: 25 }, { nimi: 'Kiipeily', perus: 40 },
    { nimi: 'Ratsastus', perus: 5 }, { nimi: 'Uinti', perus: 15 }, { nimi: 'Veneily', perus: 5 }, { nimi: 'Väistö', perus: 5 },
  ]},
  { kategoria: 'kommunikointi',  display: 'Kommunikointi',  skills: [
    { nimi: 'Kielen puhuminen (oma)', perus: 30 }, { nimi: 'Kielen puhuminen (vieras)', perus: 0 },
    { nimi: 'Laulu', perus: 5 }, { nimi: 'Puhetaito', perus: 5 }, { nimi: 'Suostuttelu', perus: 5 },
  ]},
  { kategoria: 'tieto',          display: 'Tieto',          skills: [
    { nimi: 'Ammatti', perus: 10 }, { nimi: 'Arvon arviointi', perus: 5 }, { nimi: 'Ensiapu', perus: 10 },
    { nimi: 'Laivankäsittely', perus: 0 }, { nimi: 'Lue/kirjoita kieli', perus: 0 },
    { nimi: 'Eläintieto', perus: 5 }, { nimi: 'Ihmistieto', perus: 5 }, { nimi: 'Kasvitieto', perus: 5 },
    { nimi: 'Mineraalitieto', perus: 5 }, { nimi: 'Yleistieto', perus: 5 },
  ]},
  { kategoria: 'manipulointi',   display: 'Manipulointi',   skills: [
    { nimi: 'Aseeton taistelu', perus: 0 }, { nimi: 'Kätke', perus: 5 }, { nimi: 'Laadi', perus: 5 },
    { nimi: 'Silmänkääntö', perus: 5 }, { nimi: 'Soita instrumentti', perus: 0 },
  ]},
  { kategoria: 'havainto',       display: 'Havainto',       skills: [
    { nimi: 'Etsintä', perus: 25 }, { nimi: 'Havaitse', perus: 25 },
    { nimi: 'Jäljitys', perus: 5 }, { nimi: 'Kuuntelu', perus: 25 },
  ]},
  { kategoria: 'salavihkaisuus', display: 'Salavihkaisuus', skills: [
    { nimi: 'Hiipiminen', perus: 10 }, { nimi: 'Piileskely', perus: 10 },
  ]},
  { kategoria: 'taikuus',        display: 'Taikuus',        skills: [
    { nimi: 'Seremonia', perus: 0 }, { nimi: 'Kutsuminen', perus: 0 }, { nimi: 'Intensiteetti', perus: 0 },
  ]},
]

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
  const attrs = { VMA: c.VMA ?? 0, RR: c.RR ?? 0, KOK: c.KOK ?? 0, ALY: c.ALY ?? 0, MHT: c.MHT ?? 0, NPP: c.NPP ?? 0, ULK: c.ULK ?? 0 }

  const selMelee  = (c.valitutMeleeAseet    || []).map(id => MELEE_ASEET.find(a => a.id === id)).filter(Boolean) as MeleeAse[]
  const selHeitto = (c.valitutHeittoAseet   || []).map(id => HEITTO_ASEET.find(a => a.id === id)).filter(Boolean) as HeittoAse[]
  const selHenki  = (c.valitutHenkitaikuudet || []).map(id => HENKI_TAIKUUS.find(t => t.id === id)).filter(Boolean) as HenkiTaika[]
  const selRiimu  = (c.valitutRiimutaikuudet || []).map(id => RIIMU_TAIKUUS.find(t => t.id === id)).filter(Boolean) as RiimuTaika[]

  const hasAseet   = selMelee.length > 0 || selHeitto.length > 0
  const hasTaikuus = selHenki.length > 0  || selRiimu.length > 0

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
              <StatBlock label="Vahinko" value={c.vahinkomuutos ?? '—'} icon={Sword} />
              <StatBlock label="Liike"   value={c.liike ?? 3}           icon={Wind} />
              <StatBlock label="IH"      value={c.IH}                   icon={Zap}    color="text-yellow-400" />
              <StatBlock label="KP"      value={c.KP}                   icon={Heart}  color="text-red-400" />
              <StatBlock label="TP"      value={c.TP}                   icon={Brain}  color="text-blue-400" />
              <StatBlock label="VP"      value={c.vasymyspisteet ?? '—'} icon={Shield} color="text-orange-400" />
            </div>
            {c.kestopisteetKohdittain && (
              <div className="mt-3">
                <p className="text-forest-500 text-xs font-mono uppercase tracking-widest mb-2">Kestopisteet kohdittain</p>
                <div className="grid grid-cols-5 gap-2">
                  {([
                    ['Jalat',  c.kestopisteetKohdittain.jalat],
                    ['Vatsa',  c.kestopisteetKohdittain.vatsa],
                    ['Rinta',  c.kestopisteetKohdittain.rinta],
                    ['Kädet',  c.kestopisteetKohdittain.kadet],
                    ['Pää',    c.kestopisteetKohdittain.paa],
                  ] as [string, number][]).map(([label, val]) => (
                    <div key={label} className="text-center p-2 rounded-xl bg-black/20 border border-white/5">
                      <div className="font-mono text-base font-bold text-red-400">{val}</div>
                      <div className="text-forest-400 text-xs font-mono mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Section>

          {/* All skills by category with attribute bonuses applied */}
          <Section title="Kaikki kyvyt" accent={theme.accent}>
            <div className="grid grid-cols-2 gap-x-12">
              {ALL_SKILLS.map(({ kategoria, display, skills }) => {
                const bonus = calculateCategoryBonus(attrs, kategoria)
                const bonusStr = bonus >= 0 ? `+${bonus}` : `${bonus}`
                return (
                  <div key={kategoria} className="mb-4">
                    <p className="font-display text-xs tracking-widest uppercase mb-1.5 flex items-center gap-2"
                       style={{ color: theme.accent }}>
                      {display}
                      <span className="font-mono text-forest-500 normal-case tracking-normal" style={{ fontSize: '0.65rem' }}>({bonusStr})</span>
                    </p>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs font-mono">
                      {skills.map(({ nimi, perus }) => {
                        const learned = (c.kyvyt?.[nimi] || 0) as number
                        const total   = Math.max(0, perus + learned + bonus)
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
                )
              })}
            </div>
          </Section>

          {/* Equipment */}
          {hasAseet && (
            <Section title="Aseet" accent={theme.accent}>
              {selMelee.length > 0 && (
                <div className="mb-4">
                  <p className="text-forest-500 text-xs font-mono uppercase tracking-widest mb-2">Lähitaistelu</p>
                  <div className="grid grid-cols-[1fr_auto_auto_auto_auto_auto] gap-x-4 gap-y-1 text-xs font-mono">
                    <span className="text-forest-600">Nimi</span>
                    <span className="text-forest-600">Tyyppi</span>
                    <span className="text-forest-600">Vahinko</span>
                    <span className="text-forest-600">ENC</span>
                    <span className="text-forest-600">Suoj.</span>
                    <span className="text-forest-600">Peru%</span>
                    {selMelee.map(a => (
                      <React.Fragment key={a.id}>
                        <span className="text-parchment font-body text-sm">{a.nimi}</span>
                        <span className="text-forest-400">{a.aselaji}</span>
                        <span style={{ color: theme.accent }}>{a.vahinko}</span>
                        <span className="text-forest-400">{a.enc}</span>
                        <span className="text-forest-400">{a.suojapisteet ?? '—'}</span>
                        <span className="text-forest-400">{a.perusPrs}%</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
              {selHeitto.length > 0 && (
                <div>
                  <p className="text-forest-500 text-xs font-mono uppercase tracking-widest mb-2">Heittoaseet</p>
                  <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-x-4 gap-y-1 text-xs font-mono">
                    <span className="text-forest-600">Nimi</span>
                    <span className="text-forest-600">Vahinko</span>
                    <span className="text-forest-600">Kanto n/m</span>
                    <span className="text-forest-600">ENC</span>
                    <span className="text-forest-600">Peru%</span>
                    {selHeitto.map(a => (
                      <React.Fragment key={a.id}>
                        <span className="text-parchment font-body text-sm">{a.nimi}</span>
                        <span style={{ color: theme.accent }}>{a.vahinko}</span>
                        <span className="text-forest-400">{a.normaaliKanto}/{a.maksimiKanto}m</span>
                        <span className="text-forest-400">{a.enc}</span>
                        <span className="text-forest-400">{a.perusPrs}%</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </Section>
          )}

          {/* Magic */}
          {hasTaikuus && (
            <Section title="Taikuus" accent={theme.accent}>
              {selHenki.length > 0 && (
                <div className="mb-4">
                  <p className="text-forest-500 text-xs font-mono uppercase tracking-widest mb-2">Henkitaikuus</p>
                  <div className="grid grid-cols-[1fr_auto_auto_auto] gap-x-6 gap-y-1 text-xs font-mono">
                    <span className="text-forest-600">Loitsu</span>
                    <span className="text-forest-600">TP</span>
                    <span className="text-forest-600">Kanto</span>
                    <span className="text-forest-600">Kesto</span>
                    {selHenki.map(t => (
                      <React.Fragment key={t.id}>
                        <span className="text-parchment font-body text-sm">{t.nimi}</span>
                        <span style={{ color: theme.accent }}>{t.taikapisteet === -1 ? 'muutt.' : t.taikapisteet}</span>
                        <span className="text-forest-400">{t.kantomatka}</span>
                        <span className="text-forest-400">{t.kestoaika}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
              {selRiimu.length > 0 && (
                <div>
                  <p className="text-forest-500 text-xs font-mono uppercase tracking-widest mb-2">Riimutaikuus</p>
                  <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-x-6 gap-y-1 text-xs font-mono">
                    <span className="text-forest-600">Loitsu</span>
                    <span className="text-forest-600">LP</span>
                    <span className="text-forest-600">Kanto</span>
                    <span className="text-forest-600">Kesto</span>
                    <span className="text-forest-600">Saatavuus</span>
                    {selRiimu.map(t => (
                      <React.Fragment key={t.id}>
                        <span className="text-parchment font-body text-sm">{t.nimi}</span>
                        <span style={{ color: theme.accent }}>{t.taikapisteet}</span>
                        <span className="text-forest-400">{t.kantomatka}</span>
                        <span className="text-forest-400">{t.kestoaika}</span>
                        <span className="text-forest-400">{t.saatavuus}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </Section>
          )}

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
