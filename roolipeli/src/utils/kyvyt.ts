export type KykyKategoria =
  | 'ketteryys'
  | 'kommunikointi'
  | 'tieto'
  | 'manipulointi'
  | 'havainto'
  | 'salavihkaisuus'
  | 'taikuus'

export const KYKYLAJI_CONFIG: Record<KykyKategoria, { ensisijainen: string[]; toissijainen: string[]; negatiivinen: string[] }> = {
  ketteryys:      { ensisijainen: ['NPP'],        toissijainen: ['VMA'],        negatiivinen: ['KOK']        },
  kommunikointi:  { ensisijainen: ['ALY'],        toissijainen: ['MHT', 'ULK'], negatiivinen: []             },
  tieto:          { ensisijainen: ['ALY'],        toissijainen: [],             negatiivinen: []             },
  manipulointi:   { ensisijainen: ['ALY', 'NPP'], toissijainen: ['VMA'],        negatiivinen: []             },
  havainto:       { ensisijainen: ['ALY'],        toissijainen: ['MHT', 'RR'],  negatiivinen: []             },
  salavihkaisuus: { ensisijainen: ['NPP'],        toissijainen: [],             negatiivinen: ['KOK', 'MHT'] },
  taikuus:        { ensisijainen: ['ALY', 'MHT'], toissijainen: ['NPP'],        negatiivinen: []             },
}

export interface Kyky {
  nimi: string
  perus: number
  kategoria: KykyKategoria
}

export const KYVYT_LISTA: Kyky[] = [
  { nimi: 'Heitto',           perus: 25, kategoria: 'ketteryys'      },
  { nimi: 'Hyppy',            perus: 25, kategoria: 'ketteryys'      },
  { nimi: 'Kiipeily',         perus: 40, kategoria: 'ketteryys'      },
  { nimi: 'Ratsastus',        perus:  5, kategoria: 'ketteryys'      },
  { nimi: 'Uinti',            perus: 15, kategoria: 'ketteryys'      },
  { nimi: 'Väistö',           perus:  5, kategoria: 'ketteryys'      },
  { nimi: 'Puhetaito',        perus:  5, kategoria: 'kommunikointi'  },
  { nimi: 'Suostuttelu',      perus:  5, kategoria: 'kommunikointi'  },
  { nimi: 'Laulu',            perus:  5, kategoria: 'kommunikointi'  },
  { nimi: 'Ensiapu',          perus: 10, kategoria: 'tieto'          },
  { nimi: 'Eläintieto',       perus:  5, kategoria: 'tieto'          },
  { nimi: 'Ihmistieto',       perus:  5, kategoria: 'tieto'          },
  { nimi: 'Kasvitieto',       perus:  5, kategoria: 'tieto'          },
  { nimi: 'Yleistieto',       perus:  5, kategoria: 'tieto'          },
  { nimi: 'Aseeton taistelu', perus:  0, kategoria: 'manipulointi'   },
  { nimi: 'Kätke',            perus:  5, kategoria: 'manipulointi'   },
  { nimi: 'Laadi',            perus:  5, kategoria: 'manipulointi'   },
  { nimi: 'Silmänkääntö',     perus:  5, kategoria: 'manipulointi'   },
  { nimi: 'Etsintä',          perus: 25, kategoria: 'havainto'       },
  { nimi: 'Havaitse',         perus: 25, kategoria: 'havainto'       },
  { nimi: 'Kuuntelu',         perus: 25, kategoria: 'havainto'       },
  { nimi: 'Hiipiminen',       perus: 10, kategoria: 'salavihkaisuus' },
  { nimi: 'Piileskely',       perus: 10, kategoria: 'salavihkaisuus' },
]

export function calculateCategoryBonus(
  ominaisuudet: Partial<Record<string, number>>,
  kategoria: KykyKategoria,
): number {
  const saannot = KYKYLAJI_CONFIG[kategoria]
  let bonus = 0

  saannot.ensisijainen.forEach(om => { bonus += (ominaisuudet[om] ?? 0) - 10 })
  saannot.toissijainen.forEach(om => { bonus += Math.floor(((ominaisuudet[om] ?? 0) - 10) / 2) })
  saannot.negatiivinen.forEach(om  => { bonus -= (ominaisuudet[om] ?? 0) - 10 })

  return bonus
}
