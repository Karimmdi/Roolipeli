export interface KestopisteetKohdittain {
  jalat: number
  vatsa: number
  rinta: number
  kadet: number
  paa: number
}

/** Vahinkomuutos (damage bonus) based on VMA + KOK sum. */
export function laskeVahinkomuutos(VMA: number, KOK: number): string {
  const s = VMA + KOK
  if (s <= 12) return '-D6'
  if (s <= 16) return '-D4'
  if (s <= 24) return '0'
  if (s <= 32) return '+D4'
  if (s <= 40) return '+D6'
  return '+2D6'
}

/** Iskunopeus (strike rank) — lower is faster. */
export function laskeIskunopeus(NPP: number, KOK: number): number {
  const nppSR = NPP <= 9 ? 4 : NPP <= 15 ? 3 : NPP <= 19 ? 2 : 1
  const kokSR = KOK <= 9 ? 3 : KOK <= 15 ? 2 : KOK <= 19 ? 1 : 0
  return nppSR + kokSR
}

/** Kokonaiskestopisteet (total hit points). */
export function laskeKestopisteet(KOK: number, VMA: number): number {
  return Math.ceil((KOK + VMA) / 2)
}

/** Vasymyspisteet (fatigue points) = VMA + KOK. */
export function laskeVasymyspisteet(VMA: number, KOK: number): number {
  return VMA + KOK
}

/** Liike (movement rate) — 3 for all standard human characters. */
export function laskeLiike(): number {
  return 3
}

/** Kestopisteet (hit points) per body location. */
export function laskeKestopisteetKohdittain(kp: number): KestopisteetKohdittain {
  const pohja = Math.floor(kp / 3)
  return {
    jalat: Math.max(1, pohja),
    vatsa: Math.max(1, pohja + 1),
    rinta: Math.max(1, Math.ceil(kp / 4) + 1),
    kadet: Math.max(1, pohja - 1),
    paa:   Math.max(1, pohja + 1),
  }
}
