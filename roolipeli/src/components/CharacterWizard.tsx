import React, { useState } from 'react'
import { X, ChevronLeft, ChevronRight, Check, Sparkles, ChevronDown, ChevronUp } from 'lucide-react'
import { CharacterData } from './CharacterCard'

function getDiceNotation(key: string): string {
  return key === 'KOK' || key === 'ALY' ? '2d6+6' : '3d6'
}

function roll(count: number, sides: number, bonus = 0) {
  let total = bonus
  for (let i = 0; i < count; i++) total += Math.floor(Math.random() * sides) + 1
  return total
}

function rollAllAttributes() {
  return {
    VMA: roll(3, 6), RR: roll(3, 6), KOK: roll(2, 6, 6),
    ALY: roll(2, 6, 6), MHT: roll(3, 6), NPP: roll(3, 6), ULK: roll(3, 6),
  }
}

const STEPS = [
  { label: 'Perustiedot'  },
  { label: 'Ominaisuudet' },
  { label: 'Kyvyt'        },
  { label: 'Tausta'       },
]

const KULTTUURIT = [
  'Barbaarivyö', 'Caladramaa',
]

const KULTIT = [
  'Ei kulttia', 'Orlanth', 'Kyger Litor', 'Humakt', 'Ernalda', 'Issaries',
  'Lhankor Mhy', 'Chalana Arroy', 'Myrskyhärkä', 'Yelm', 'Yelmalio',
  'Seitsemän Äitiä', 'Punainen Jumalatar', 'Etyries', 'Zorak Zoran',
]

const ROOLIT = [
  'Uskonnoton', 'Maallikko', 'Noviisi', 'Akolyytti', 'Pappi',
  'Riimulordi', 'Ylipappi', 'Shamaani', 'Velho', 'Maagi',
]

const KYVYT_LISTA = [
  { nimi: 'Heitto', perus: 25 }, { nimi: 'Hyppy', perus: 25 }, { nimi: 'Kiipeily', perus: 40 },
  { nimi: 'Ratsastus', perus: 5 }, { nimi: 'Uinti', perus: 15 }, { nimi: 'Väistö', perus: 5 },
  { nimi: 'Puhetaito', perus: 5 }, { nimi: 'Suostuttelu', perus: 5 }, { nimi: 'Laulu', perus: 5 },
  { nimi: 'Ensiapu', perus: 10 }, { nimi: 'Eläintieto', perus: 5 }, { nimi: 'Ihmistieto', perus: 5 },
  { nimi: 'Kasvitieto', perus: 5 }, { nimi: 'Yleistieto', perus: 5 }, { nimi: 'Aseeton taistelu', perus: 0 },
  { nimi: 'Kätke', perus: 5 }, { nimi: 'Laadi', perus: 5 }, { nimi: 'Silmänkääntö', perus: 5 },
  { nimi: 'Etsintä', perus: 25 }, { nimi: 'Havaitse', perus: 25 }, { nimi: 'Kuuntelu', perus: 25 },
  { nimi: 'Hiipiminen', perus: 10 }, { nimi: 'Piileskely', perus: 10 },
]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border border-forest-700/50 rounded-lg overflow-hidden mb-4">
      <button type="button" onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-forest-800/60 hover:bg-forest-700/60 transition-colors">
        <span className="font-display text-rune text-sm tracking-widest uppercase">{title}</span>
        {open ? <ChevronUp size={16} className="text-forest-400" /> : <ChevronDown size={16} className="text-forest-400" />}
      </button>
      {open && <div className="px-4 py-3 bg-forest-900/40">{children}</div>}
    </div>
  )
}

interface Props {
  onClose: () => void
  onSave: (character: CharacterData) => void
  existingCharacter?: CharacterData | null
}

export default function CharacterWizard({ onClose, onSave, existingCharacter }: Props) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    nimi: existingCharacter?.nimi || '',
    pelaaja: existingCharacter?.pelaaja || '',
    ika: existingCharacter?.ika || '',
    sukupuoli: existingCharacter?.sukupuoli || 'M',
    ammatti: existingCharacter?.ammatti || '',
    kotimaa: existingCharacter?.kotimaa || '',
    isanAmmatti: existingCharacter?.isanAmmatti || '',
    aidanAmmatti: existingCharacter?.aidanAmmatti || '',
    kulttuuri: existingCharacter?.kulttuuri || 'Barbaarivyö',
    kultti: existingCharacter?.kultti || 'Ei kulttia',
    uskonnollinenRooli: existingCharacter?.uskonnollinenRooli || 'Maallikko',
    tausta: existingCharacter?.tausta || '',
    VMA: existingCharacter?.VMA || 10,
    RR: existingCharacter?.RR || 10,
    KOK: existingCharacter?.KOK || 10,
    ALY: existingCharacter?.ALY || 10,
    MHT: existingCharacter?.MHT || 10,
    NPP: existingCharacter?.NPP || 10,
    ULK: existingCharacter?.ULK || 10,
  })

  const set = (key: string, val: any) => setForm(f => ({ ...f, [key]: val }))

  const handleSave = () => {
    onSave({
      id: existingCharacter?.id || Date.now().toString(),
      ...form,
      KP: Math.ceil((form.KOK + form.VMA) / 2),
      TP: form.MHT,
      IH: (form.NPP <= 9 ? 4 : form.NPP <= 15 ? 3 : form.NPP <= 19 ? 2 : 1)
        + (form.KOK <= 9 ? 3 : form.KOK <= 15 ? 2 : form.KOK <= 19 ? 1 : 0),
    })
  }

  const isFirst = step === 0
  const isLast  = step === STEPS.length - 1
  const progressPct = (step / (STEPS.length - 1)) * 100

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
         style={{ backdropFilter: 'blur(6px)', backgroundColor: 'rgba(7,26,9,0.85)' }}>
      <div className="relative w-full max-w-3xl my-8 rounded-2xl shadow-rune border border-forest-600/50"
           style={{ background: 'linear-gradient(160deg, #0e1f0f 0%, #071a09 100%)' }}>

        {/* Header */}
        <div className="relative px-8 py-6 border-b border-forest-700/50"
             style={{ background: 'linear-gradient(90deg, #1e3d1f 0%, #0e2410 100%)' }}>
          <div className="absolute inset-0 opacity-5 bg-forest-grain pointer-events-none" />
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-display text-2xl text-parchment tracking-widest">
                {existingCharacter ? 'Muokkaa hahmoa' : 'Luo uusi hahmo'}
              </h2>
              <p className="font-body text-forest-400 text-sm mt-1 italic">
                Fantasia-peli — Hahmonluontilomake v.0.1
              </p>
            </div>
            <button type="button" onClick={onClose}
              className="relative z-10 p-2 rounded-lg text-forest-400 hover:text-parchment
                         hover:bg-forest-700/50 transition-all">
              <X size={22} />
            </button>
          </div>

          {/* Step progress 
          <div className="relative">
            <div className="flex justify-between mb-2">
              {STEPS.map((s, i) => (
                <button key={i} type="button"
                  onClick={() => setStep(i)}
                  className="flex flex-col items-center gap-1 cursor-pointer">
                  <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center font-mono text-xs font-bold transition-all
                    ${i < step ? 'bg-rune border-rune text-darkwood' : i === step ? 'bg-forest-700 border-rune text-rune' : 'bg-forest-900 border-forest-700 text-forest-600'}`}>
                    {i < step ? <Check size={12} /> : i + 1}
                  </div>
                  <span className={`text-xs font-mono hidden sm:block ${i === step ? 'text-rune' : i < step ? 'text-forest-400' : 'text-forest-700'}`}>
                    {s.label}
                  </span>
                </button>
              ))}
            </div>
            <div className="absolute top-3.5 left-3.5 right-3.5 h-0.5 bg-forest-800 -z-0">
              <div className="h-full bg-rune transition-all duration-500 rounded-full" style={{ width: `${progressPct}%` }} />
            </div>
          </div>*/}
        </div>

        <div className="px-8 py-6 space-y-2">

          {/* Step 1 — Basic info */}
          {step === 0 && (
            <Section title="Perustiedot">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {([
                  ['Hahmon nimi *', 'nimi',          'text'],
                  ['Pelaajan nimi', 'pelaaja',        'text'],
                  ['Ikä',           'ika',            'number'],
                  ['Kotimaa / Heimo', 'kotimaa',      'text'],
                  ['Isän ammatti',  'isanAmmatti',    'text'],
                  ['Äidin ammatti', 'aidanAmmatti',   'text'],
                  ['Ammatti',       'ammatti',        'text'],
                ] as [string, string, string][]).map(([label, key, type]) => (
                  <div key={key}>
                    <label className="block text-forest-400 text-sm mb-1 font-mono tracking-wider">{label}</label>
                    <input type={type} value={(form as any)[key]}
                      onChange={e => set(key, e.target.value)}
                      className="w-full bg-forest-900/80 border border-forest-700 rounded-lg px-3 py-2
                                 text-parchment font-body focus:border-rune focus:outline-none
                                 focus:ring-1 focus:ring-rune/30 transition-all" />
                  </div>
                ))}

                <div>
                  <label className="block text-forest-400 text-sm mb-1 font-mono tracking-wider">Sukupuoli</label>
                  <div className="flex gap-3">
                    {['M', 'N'].map(g => (
                      <button key={g} type="button" onClick={() => set('sukupuoli', g)}
                        className={`flex-1 py-2 rounded-lg border font-mono text-sm transition-all
                          ${form.sukupuoli === g ? 'border-rune bg-forest-700/50 text-rune' : 'border-forest-700 text-forest-400 hover:border-forest-500'}`}>
                        {g === 'M' ? '♂ Mies' : '♀ Nainen'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-forest-400 text-sm mb-1 font-mono tracking-wider">Kulttuuri</label>
                  <select value={form.kulttuuri} onChange={e => set('kulttuuri', e.target.value)}
                    className="w-full bg-forest-900/80 border border-forest-700 rounded-lg px-3 py-2 text-parchment font-body focus:border-rune focus:outline-none">
                    {KULTTUURIT.map(k => <option key={k} value={k}>{k}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-forest-400 text-sm mb-1 font-mono tracking-wider">Kultti</label>
                  <select value={form.kultti} onChange={e => set('kultti', e.target.value)}
                    className="w-full bg-forest-900/80 border border-forest-700 rounded-lg px-3 py-2 text-parchment font-body focus:border-rune focus:outline-none">
                    {KULTIT.map(k => <option key={k} value={k}>{k}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-forest-400 text-sm mb-1 font-mono tracking-wider">Uskonnollinen rooli</label>
                  <select value={form.uskonnollinenRooli} onChange={e => set('uskonnollinenRooli', e.target.value)}
                    className="w-full bg-forest-900/80 border border-forest-700 rounded-lg px-3 py-2 text-parchment font-body focus:border-rune focus:outline-none">
                    {ROOLIT.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>
            </Section>
          )}

          {/* Step 2 — Attributes */}
          {step === 1 && (
            <Section title="Ominaisuudet">
              {/* Method selector */}
              <div className="mb-4 flex flex-wrap gap-2">
                {[
                  { id: 'random',     label: 'Satunnaismetodi'  },
                  { id: 'deliberate', label: 'Harkintametodi'   },
                  { id: 'combined',   label: 'Yhdistelmämetodi' },
                ].map(m => (
                  <button key={m.id} type="button"
                    onClick={() => {
                      set('pointMethod', m.id)
                      if (m.id === 'random' || m.id === 'combined') {
                        const rolled = rollAllAttributes()
                        setForm(f => ({ ...f, ...rolled }))
                      } else {
                        setForm(f => ({ ...f, VMA:10, RR:10, KOK:10, ALY:10, MHT:10, NPP:10, ULK:10 }))
                      }
                    }}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all
                      ${(form as any).pointMethod === m.id
                        ? 'border-rune bg-forest-700/50 text-rune'
                        : 'border-forest-700 text-forest-400 hover:border-forest-500'}`}>
                    {m.label}
                  </button>
                ))}
                <button type="button"
                  onClick={() => { const rolled = rollAllAttributes(); setForm(f => ({ ...f, ...rolled })) }}
                  className="px-3 py-1.5 rounded-lg border border-gold/50 text-gold/80
                             hover:border-gold hover:text-gold text-xs font-mono
                             flex items-center gap-1.5 transition-all">
                  🎲 Heitä nopat
                </button>
              </div>

              <div className="space-y-0.5">
                {([
                  ['VMA', 'VMA', 3, 18], ['R-R', 'RR', 3, 18], ['KOK', 'KOK', 8, 18],
                  ['ÄLY', 'ALY', 8, 18], ['MHT', 'MHT', 3, 18], ['NPP', 'NPP', 3, 18], ['ULK', 'ULK', 3, 18],
                ] as [string, string, number, number][]).map(([label, key, min, max]) => (
                  <div key={key} className="grid grid-cols-[80px_1fr_80px_36px] gap-2 items-center py-1.5 border-b border-forest-700/30">
                    <span className="font-mono text-rune text-sm font-bold">{label}</span>
                    <span className="text-forest-500 text-xs font-mono">{getDiceNotation(key)}</span>
                    <input type="number" min={min} max={max} value={(form as any)[key]}
                      onChange={e => set(key, parseInt(e.target.value) || min)}
                      className="w-full bg-forest-900 border border-forest-600 rounded px-2 py-0.5
                                 text-parchment font-mono text-sm text-center
                                 focus:border-rune focus:outline-none" />
                    <button type="button"
                      onClick={() => { const info = getDiceNotation(key); const [cnt, s] = info.replace('+6','').split('d').map(Number); const bonus = info.includes('+6') ? 6 : 0; let total = bonus; for(let i=0;i<cnt;i++) total += Math.floor(Math.random()*s)+1; set(key, total) }}
                      className="w-9 h-8 flex items-center justify-center rounded-lg border border-gold/40
                                 text-gold/70 hover:border-gold hover:text-gold transition-all text-base"
                      title={`Heitä ${label}`}>
                      🎲
                    </button>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Step 3 — Skills */}
          {step === 2 && (
            <Section title="Kyvyt">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {KYVYT_LISTA.map(({ nimi, perus }) => (
                  <div key={nimi} className="flex items-center gap-2 py-0.5">
                    <span className="text-forest-400 text-sm flex-1 font-body">{nimi}</span>
                    <span className="text-forest-600 text-xs w-6 text-right">{perus}</span>
                    <span className="text-forest-500 text-xs">+</span>
                    <input type="number" min={0} defaultValue={0}
                      className="w-14 bg-forest-900 border border-forest-700 rounded px-1 py-0.5
                                 text-parchment font-mono text-xs text-center focus:border-rune focus:outline-none" />
                    <span className="text-rune text-sm font-bold w-8 text-right">{perus}%</span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Step 4 — Background */}
          {step === 3 && (
            <Section title="Tausta">
              <textarea value={form.tausta} onChange={e => set('tausta', e.target.value)}
                rows={8}
                placeholder="Kirjoita hahmon taustatarina, luonteenpiirteet ja muut tiedot..."
                className="w-full bg-forest-900/80 border border-forest-700 rounded-lg px-3 py-2
                           text-parchment font-body focus:border-rune focus:outline-none
                           focus:ring-1 focus:ring-rune/30 transition-all resize-none placeholder-forest-700" />
            </Section>
          )}

          {/* Navigation */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={isFirst ? onClose : () => setStep(s => s - 1)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-forest-600
                         text-forest-400 hover:border-forest-400 hover:text-parchment
                         font-display text-sm tracking-widest transition-all">
              <ChevronLeft size={16} />
              {isFirst ? 'Peruuta' : 'Edellinen'}
            </button>
            <div className="flex-1" />
            {existingCharacter && !isLast && (
              <button type="button" onClick={handleSave}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-display text-sm
                           tracking-widest transition-all border border-rune/40
                           bg-forest-800/60 text-rune hover:bg-forest-700/60 shadow-rune">
                <Check size={16} />
                Tallenna muutokset
              </button>
            )}
            {!isLast ? (
              <button type="button" onClick={() => setStep(s => s + 1)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-display text-sm
                           tracking-widest transition-all border border-forest-500
                           bg-gradient-to-r from-forest-700 to-forest-800 text-parchment
                           hover:from-forest-600 hover:to-forest-700 shadow-rune">
                Seuraava <ChevronRight size={16} />
              </button>
            ) : (
              <button type="button" onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-display text-sm
                           tracking-widest transition-all border border-rune/50
                           bg-gradient-to-r from-forest-600 to-forest-700 text-parchment
                           hover:from-forest-500 hover:to-forest-600 shadow-rune">
                <Sparkles size={16} />
                {existingCharacter ? 'Tallenna muutokset' : 'Luo hahmo'}
              </button>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}
