export interface MeleeAse {
  id: string
  nimi: string
  aselaji: string
  vahinko: string
  VMA: number | null
  NPP: number | null
  enc: number
  perusPrs: number
  suojapisteet: number | null
  iskuhetki: number
  hinta: number
  erikoisosuma: string
}

export interface HeittoAse {
  id: string
  nimi: string
  VMA: number | null
  NPP: number | null
  perusPrs: number
  enc: number
  vahinko: string
  suojapisteet: number | null
  normaaliKanto: number
  maksimiKanto: number
  tno: number
  tnoJakaja: number
  tnoYksikko: string
  hinta: number
}

export interface HenkiTaika {
  id: string
  nimi: string
  tyyppi: string
  taikapisteet: number
  kantomatka: string
  kestoaika: string
  kuvaus: string
  aktiivisuus: string
}

export interface RiimuTaika {
  id: string
  nimi: string
  taikapisteet: number
  kantomatka: string
  kestoaika: string
  pinottavuus: string
  uusiutuvuus: string
  kuvaus: string
  saatavuus: string
}
