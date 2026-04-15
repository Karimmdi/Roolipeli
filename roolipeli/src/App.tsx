import React, { useState, useEffect } from 'react'
import { Plus, Search, X } from 'lucide-react'
import CharacterCard, { CharacterData } from './components/CharacterCard'
import CharacterWizard from './components/CharacterWizard'
import CharacterDetailModal from './components/CharacterDetailModal'
import ConfirmModal from './components/ConfirmModal'

const INITIAL_CHARACTERS: CharacterData[] = [
  {
    id: '1',
    nimi: 'Aldric Tuulenhaltija',
    pelaaja: 'Mikko',
    ammatti: 'Soturi',
    kulttuuri: 'Barbaarivyö',
    kultti: 'Orlanth',
    uskonnollinenRooli: 'Noviisi',
    sukupuoli: 'M',
    ika: '24',
    kotimaa: 'Sartar',
    isanAmmatti: 'Seppä',
    aidanAmmatti: 'Parantaja',
    tausta: 'Sartarilainen soturi, joka on omistautunut Orlanthin palvelemiselle.',
    VMA: 16, RR: 14, KOK: 13, ALY: 11, MHT: 12, NPP: 15, ULK: 10,
    KP: 15, TP: 12, IH: 5, vahinkomuutos: '+D4',
    kyvyt: { 'Heitto': 45, 'Hyppy': 40, 'Väistö': 35, 'Havaitse': 40, 'Kuuntelu': 35 },
  },
  {
    id: '2',
    nimi: 'Sylara Yönsilmä',
    pelaaja: 'Anna',
    ammatti: 'Parantaja',
    kulttuuri: 'Safelster',
    kultti: 'Chalana Arroy',
    uskonnollinenRooli: 'Pappi',
    sukupuoli: 'N',
    ika: '31',
    kotimaa: 'Safelster',
    isanAmmatti: 'Metsästäjä',
    aidanAmmatti: 'Parantaja',
    tausta: 'Kokenut parantaja, uskollinen Chalana Arroyn rauhan tiellä.',
    VMA: 9, RR: 11, KOK: 10, ALY: 18, MHT: 16, NPP: 17, ULK: 15,
    KP: 10, TP: 16, IH: 4, vahinkomuutos: '-D4',
    kyvyt: { 'Ensiapu': 75, 'Kasvitieto': 60, 'Kuuntelu': 45, 'Havaitse': 50, 'Hiipiminen': 30 },
  },
  {
    id: '3',
    nimi: 'Borin Kivisydän',
    pelaaja: 'Tero',
    ammatti: 'Kauppias',
    kulttuuri: 'Barbaarivyö',
    kultti: 'Issaries',
    uskonnollinenRooli: 'Noviisi',
    sukupuoli: 'M',
    ika: '42',
    kotimaa: 'Heortland',
    isanAmmatti: 'Soturi',
    aidanAmmatti: 'Käsityöläinen',
    tausta: 'Entinen soturi josta tuli kauppias. Tuntee tiet ja markkinat läpikotaisin.',
    VMA: 14, RR: 16, KOK: 15, ALY: 12, MHT: 10, NPP: 11, ULK: 9,
    KP: 15, TP: 10, IH: 5, vahinkomuutos: '+D4',
    kyvyt: { 'Puhetaito': 55, 'Suostuttelu': 60, 'Arvon arviointi': 65, 'Ihmistieto': 35 },
  },
  {
    id: '4',
    nimi: 'Liira Ketterä',
    pelaaja: 'Sara',
    ammatti: 'Varas',
    kulttuuri: 'Barbaarivyö',
    kultti: 'Ei kulttia',
    uskonnollinenRooli: 'Uskonnoton',
    sukupuoli: 'N',
    ika: '19',
    kotimaa: 'Sartar',
    isanAmmatti: 'Kauppias',
    aidanAmmatti: 'Käsityöläinen',
    tausta: 'Nuori ja ketterä. Oppinut varkauden taidon kaduilla.',
    VMA: 10, RR: 12, KOK: 11, ALY: 14, MHT: 13, NPP: 17, ULK: 14,
    KP: 11, TP: 13, IH: 4, vahinkomuutos: '0',
    kyvyt: { 'Hiipiminen': 65, 'Piileskely': 55, 'Kätke': 45, 'Havaitse': 50, 'Etsintä': 50 },
  },
]

function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="15" stroke="#7dc480" strokeWidth="1.5" strokeOpacity="0.6" />
      <path d="M16 4 C10 8, 6 13, 8 18 C10 23, 14 26, 16 28 C18 26, 22 23, 24 18 C26 13, 22 8, 16 4Z"
            fill="#2d8a31" fillOpacity="0.6" stroke="#7dc480" strokeWidth="1" />
      <line x1="16" y1="6"  x2="16" y2="27" stroke="#a3c9a8" strokeWidth="1.2" strokeOpacity="0.9" />
      <line x1="16" y1="11" x2="19" y2="9"  stroke="#a3c9a8" strokeWidth="1" strokeOpacity="0.8" />
      <line x1="16" y1="15" x2="12" y2="13" stroke="#a3c9a8" strokeWidth="1" strokeOpacity="0.8" />
      <line x1="16" y1="19" x2="20" y2="17" stroke="#a3c9a8" strokeWidth="1" strokeOpacity="0.8" />
    </svg>
  )
}

type ModalState = { mode: 'detail' | 'edit'; char: CharacterData } | 'create' | null

export default function App() {
  const [characters, setCharacters] = useState<CharacterData[]>(INITIAL_CHARACTERS)
  const [modal, setModal]           = useState<ModalState>(null)
  const [confirmId, setConfirmId]   = useState<string | null>(null)
  const [search, setSearch]         = useState('')

  useEffect(() => {
    const svg = `data:image/svg+xml,${encodeURIComponent('<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="6" fill="#071a09"/><circle cx="16" cy="16" r="13" stroke="#7dc480" stroke-width="1.5" stroke-opacity="0.6"/><path d="M16 4 C10 8, 6 13, 8 18 C10 23, 14 26, 16 28 C18 26, 22 23, 24 18 C26 13, 22 8, 16 4Z" fill="#2d8a31" fill-opacity="0.7" stroke="#7dc480" stroke-width="1"/><line x1="16" y1="6" x2="16" y2="27" stroke="#a3c9a8" stroke-width="1.2" stroke-opacity="0.9"/></svg>')}`
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null
    if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link) }
    link.href = svg
  }, [])

  const filtered = characters.filter(c => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return c.nimi?.toLowerCase().includes(q) || c.ammatti?.toLowerCase().includes(q)
      || c.kulttuuri?.toLowerCase().includes(q) || c.pelaaja?.toLowerCase().includes(q)
  })

  const handleSave = (char: CharacterData) => {
    setCharacters(prev =>
      prev.find(c => c.id === char.id)
        ? prev.map(c => c.id === char.id ? char : c)
        : [...prev, char]
    )
    setModal(null)
  }

  const handleDelete = () => {
    if (confirmId) setCharacters(prev => prev.filter(c => c.id !== confirmId))
    setConfirmId(null)
  }

  const isEdit   = modal !== null && typeof modal === 'object' && modal.mode === 'edit'
  const isDetail = modal !== null && typeof modal === 'object' && modal.mode === 'detail'

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #071a09 0%, #0a1e0b 50%, #071609 100%)' }}>
      <div className="fixed inset-0 opacity-25 pointer-events-none bg-forest-grain" />

      {/* Header */}
      <header className="relative border-b border-forest-700/40 sticky top-0 z-30"
              style={{ background: 'linear-gradient(90deg, #0e2410 0%, #071a09 50%, #0e2410 100%)' }}>
        <div className="absolute inset-0 opacity-10 bg-forest-grain pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center gap-4 flex-wrap">

          <div className="flex items-center gap-3 mr-2">
            <Logo size={34} />
            <div>
              <h1 className="font-display text-xl text-parchment tracking-widest leading-none">Fantasia</h1>
              <p className="text-forest-600 text-xs font-mono">Hahmogalleria</p>
            </div>
          </div>

          <div className="relative flex-1 min-w-[160px] max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-forest-600" />
            <input type="text" placeholder="Hae hahmoja..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-8 py-2 rounded-xl bg-forest-900/60 border border-forest-700
                         text-parchment font-body text-sm placeholder-forest-700
                         focus:border-rune focus:outline-none transition-all" />
            {search && (
              <button type="button" onClick={() => setSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-forest-600 hover:text-forest-400">
                <X size={13} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-forest-600 text-sm font-mono hidden sm:block">
              {search ? `${filtered.length}/${characters.length}` : characters.length} hahmoa
            </span>



            <button type="button" onClick={() => setModal('create')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-display text-sm
                         tracking-widest transition-all border border-forest-500
                         bg-gradient-to-r from-forest-700 to-forest-800 text-parchment
                         hover:from-forest-600 hover:to-forest-700 shadow-rune">
              <Plus size={16} /> Uusi hahmo
            </button>
          </div>
        </div>
      </header>

      {/* Gallery */}
      <main className="relative max-w-7xl mx-auto px-6 py-8">

        {characters.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-5">
            <Logo size={72} />
            <div className="text-center">
              <p className="text-parchment font-display text-3xl tracking-wider mb-3">Ei hahmoja vielä</p>
              <p className="text-forest-400 font-body italic text-xl">Luo ensimmäinen sankarisi yläpalkin napista.</p>
            </div>
          </div>
        )}

        {characters.length > 0 && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Search size={32} className="text-forest-700" />
            <p className="text-forest-400 font-body italic text-xl">
              Haulla "<span className="text-parchment">{search}</span>" ei löydy hahmoja.
            </p>
          </div>
        )}

        {filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(c => (
              <CharacterCard key={c.id} character={c}
                onOpenDetail={char => setModal({ mode: 'detail', char })}
                onEdit={char => setModal({ mode: 'edit', char })}
                onDelete={id => setConfirmId(id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      {(modal === 'create' || isEdit) && (
        <CharacterWizard
          onClose={() => setModal(null)}
          onSave={handleSave}
          existingCharacter={isEdit ? (modal as any).char : null}
        />
      )}

      {isDetail && (
        <CharacterDetailModal
          character={(modal as any).char}
          onClose={() => setModal(null)}
          onEdit={() => setModal({ mode: 'edit', char: (modal as any).char })}
        />
      )}

      {confirmId && (
        <ConfirmModal
          title="Poista hahmo"
          message={`Haluatko varmasti poistaa hahmon "${characters.find(c => c.id === confirmId)?.nimi}"?`}
          onConfirm={handleDelete}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </div>
  )
}
