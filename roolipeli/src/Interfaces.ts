export interface Character {
  id: string
  nimi: string
  laji: "Ihminen"
  rotu: "Wareran"
  kulttuuri: "Barbaarivyo" | "Caladramaa"
  sukupuoli: "Mies" | "Nainen" 
  ammatti: "Kasityolainen" | "Viihdyttaja" | "Maanviljelija" | "Paimen" | "Mestastaja" | "Aatellinen"
  kultti: cult
  ika: string
  uskonnollinenRooli: "Apulaisshamaani" | "Shamaani" | "Velhon apulainen" | "Velho" | "Maagi" | "Maalikko" | "Noviisi" | "Akolyytti" | "Pappi" | "Ylipappi" | "Riimulordi" | "Shamaanipappi" | null
  heimo: string
  tausta?: string
  kuvaus?: string
  ominaisuudet: stats
  kyvyt: kyvyt
  johdetutArvot: johdetutArvot
}

export interface johdetutArvot {
    vahinkomuutos: number
    liike: number
    NPPIskunopeus: number
    KOKIskunopeus: number
    iskunopeus: number
    kykylajibonukset: kykylajibonukset
    vapaaAly: number
    HMuutos: number
    TMmuutos: number
    taikpisteet: number
    vasymyspisteet: number
    kokonaisKestopisteet: number
    kestopisteetKohdittain: kestopisteetKohdittain
    hankittujenTaitojenAloituspisteet: number
}

export interface kestopisteetKohdittain {
    jalat: number
    vatsa: number
    rinta: number
    kadet: number
    paa: number
}

export interface kykylajibonukset {
    ketteryys: number
    kommunikointi: number
    tieto: number
    manipulointi: number
    havainto: number
    salavihkkyys: number
    taikuus: number
}



export interface kyvyt {
    ketteryyskyvyt: ketteryyskyvyt
    kommunikointikyvyt: kommunikointikyvyt
    tietokykykyvyt: tietokykykyvyt
    manipulointiokyvyt: manipulointiokyvyt
    salavihkkyyskyvyt: salavihkkyyskyvyt
}

export interface ketteryyskyvyt {
    heitto: number
    hyppy: number
    kiipeily: number
    ratsastus: number
    uinti: number
    veneily: number
    vaisto: number
}

export interface kommunikointikyvyt {
    kieliOma: number
    kieliVieras: number
    laulu: number
    puhetaito: number
    suostuttelu: number
}

export interface tietokykykyvyt {
    ammatti: number
    arvonArviointi: number
    aseetonTaistelu: number
    ensiApu: number
    laivanKastely: number
    lukuKirjoitusTaito: number
    elainTieto: number
    ihmisTieto: number
    kasviTieto: number
    mineraaliTieto: number
    yleisTieto: number
}

export interface manipulointiokyvyt {
    katke: number
    laadi: number
    silmanKaanto: number
    soitaInstrumentti: number
    havaintoBonus: number
    etsinta: number
    jaljitys: number
    kuuntelu: number
    
}

export interface salavihkkyyskyvyt {
    hiipiminen: number
    piileskely: number
}

export interface cult {
    id: string
    nimi: string
    pantehon: string
}

export interface stats {
    VMA: number
    RR: number
    KOK: number
    ALY: number
    MHT: number
    NPP: number
    ULK: number
    }