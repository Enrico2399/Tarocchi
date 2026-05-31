export type CardData = {
  id: number;
  name: string;
  image: string;
  keywords: string[];
};

export const cards: CardData[] = [
  { id: 0, name: 'Il Matto', image: '/assets/images/Folle0.jpeg', keywords: ['inizio', 'avventura', 'spontaneità', 'fiducia', 'libertà'] },
  { id: 1, name: 'Il Mago', image: '/assets/images/Mago1.jpeg', keywords: ['manifestazione', 'volontà', 'creatività', 'risorse', 'potere personale'] },
  { id: 2, name: 'La Papessa', image: '/assets/images/Papessa2.jpeg', keywords: ['intuizione', 'mistero', 'saggezza interiore', 'silenzio', 'conoscenza occulta'] },
  { id: 3, name: "L'Imperatrice", image: '/assets/images/Imperatrice3.jpeg', keywords: ['abbondanza', 'creatività', 'nutrimento', 'fertilità', 'natura'] },
  { id: 4, name: "L'Imperatore", image: '/assets/images/Imperatore4.jpeg', keywords: ['autorità', 'struttura', 'disciplina', 'leadership', 'stabilità'] },
  { id: 5, name: 'Il Papa', image: '/assets/images/Papa5.jpeg', keywords: ['tradizione', 'guida spirituale', 'insegnamento', 'conformità', 'saggezza'] },
  { id: 6, name: 'Gli Amanti', image: '/assets/images/Amanti6.jpeg', keywords: ['scelta', 'armonia', 'relazioni', 'valori', 'unione'] },
  { id: 7, name: 'Il Carro', image: '/assets/images/Carro7.jpeg', keywords: ['determinazione', 'vittoria', 'controllo', 'volontà', 'avanzamento'] },
  { id: 8, name: 'La Giustizia', image: '/assets/images/Giustizia8.jpeg', keywords: ['equilibrio', 'verità', 'causa ed effetto', 'integrità', 'decisione'] },
  { id: 9, name: "L'Eremita", image: '/assets/images/Eremita9.jpeg', keywords: ['introspezione', 'solitudine', 'guida interiore', 'pazienza', 'ricerca'] },
  { id: 10, name: 'La Ruota', image: '/assets/images/RuotaDellaFortuna10.jpeg', keywords: ['cicli', 'destino', 'cambiamento', 'fortuna', 'turning point'] },
  { id: 11, name: 'La Forza', image: '/assets/images/Forza11.jpeg', keywords: ['coraggio', 'compassione', 'forza interiore', 'pazienza', 'autocontrollo'] },
  { id: 12, name: "L'Appeso", image: '/assets/images/Appeso12.jpg', keywords: ['sacrificio', 'prospettiva', 'pausa', 'rilascio', 'illuminazione'] },
  { id: 13, name: 'La Morte', image: '/assets/images/Morte13.jpeg', keywords: ['trasformazione', 'fine', 'rinascita', 'transizione', 'rinnovamento'] },
  { id: 14, name: 'La Temperanza', image: '/assets/images/Temperanza14.jpg', keywords: ['equilibrio', 'moderazione', 'armonia', 'pazienza', 'integrazione'] },
  { id: 15, name: 'Il Diavolo', image: '/assets/images/Diavolo15.jpeg', keywords: ['dipendenza', 'illusione', 'materialismo', 'ombra', 'liberazione'] },
  { id: 16, name: 'La Torre', image: '/assets/images/Torre16.jpeg', keywords: ['caos', 'rivelazione', 'distruzione', 'crisi', 'rinnovamento'] },
  { id: 17, name: 'La Stella', image: '/assets/images/Stelle17.jpeg', keywords: ['speranza', 'ispirazione', 'guarigione', 'serenità', 'rinascita'] },
  { id: 18, name: 'La Luna', image: '/assets/images/Luna18.jpeg', keywords: ['illusione', 'intuizione', 'subconscio', 'incertezza', 'sogni'] },
  { id: 19, name: 'Il Sole', image: '/assets/images/Sole19.jpeg', keywords: ['gioia', 'successo', 'chiarezza', 'vitalità', 'ottimismo'] },
  { id: 20, name: 'Il Giudizio', image: '/assets/images/Giudizio20.jpeg', keywords: ['risveglio', 'chiamata', 'rinnovamento', 'perdono', 'valutazione'] },
  { id: 21, name: 'Il Mondo', image: '/assets/images/Mondo21.jpeg', keywords: ['completamento', 'realizzazione', 'integrazione', 'successo', 'armonia universale'] },
];

export const POSITIONS = [
  'Situazione Attuale',
  'Sfida da Affrontare',
  'Azione Consigliata',
  'Esito',
] as const;

export type ReadingPosition = (typeof POSITIONS)[number];

export function getCardById(id: number): CardData | undefined {
  return cards.find((c) => c.id === id);
}
