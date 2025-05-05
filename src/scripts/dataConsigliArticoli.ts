export type ArticoloType = {
    target: string;
    titolo: string;
    testo: string;
};

export type ConsiglioType = {
    titolo: string;
};

export const articoli: ArticoloType[] = [
    {
        target: "1",
        titolo: "Reset Sonno: Sincronizza il Tuo Orario",
        testo: "Stabilire una routine di sonno regolare è come accordare uno strumento musicale: quando ogni parte è in sintonia, l'armonia che ne deriva è palpabile. Andare a letto e svegliarsi alla stessa ora ogni giorno, fine settimana inclusi, rafforza il tuo orologio biologico interno, il direttore d'orchestra del tuo ciclo sonno-veglia. Questa coerenza segnala al tuo corpo quando è il momento di rilassarsi e prepararsi per il riposo e quando è il momento di attivarsi. Un ritmo circadiano ben regolato non solo facilita l'addormentamento e un risveglio più agevole, ma contribuisce anche a una maggiore stabilità delle fasi del sonno, migliorando significativamente la durata e la qualità complessiva del tuo riposo notturno, come la tua app ben evidenzia attraverso i grafici dettagliati.",
    },
    {
        target: "2",
        titolo: "Termo-Relax: Ottimizza la Temperatura per un Sonno Profondo",
        testo: 'La temperatura della tua camera da letto gioca un ruolo cruciale nella qualità del tuo sonno. Immagina di avvolgerti in un fresco abbraccio anziché lottare contro un ambiente surriscaldato. Idealmente, la temperatura dovrebbe mantenersi tra i 18 e i 22 gradi Celsius. Questo intervallo favorisce un abbassamento della temperatura corporea interna, un processo naturale che precede l\'addormentamento. Una stanza troppo calda può ostacolare questo processo, rendendo il sonno più leggero e frammentato. Considera di utilizzare lenzuola traspiranti, regolare il termostato o aprire una finestra per creare la tua personale "oasi di freschezza", un ambiente che inviti al riposo profondo e rigenerante che la tua app saprà quantificare in termini di miglioramento delle fasi di sonno profondo.',
    },
    {
        target: "3",
        titolo: "Bye Bye Schermo: Libera la Tua Notte e Dormi Meglio",
        testo: 'La luce brillante emessa dagli schermi dei nostri dispositivi elettronici è un potente interferente con la nostra naturale preparazione al sonno. Questa "luce blu" inganna il cervello facendogli credere che sia ancora giorno, sopprimendo la produzione di melatonina, l\'ormone chiave che segnala al corpo che è ora di dormire. Stabilire una "zona libera da schermi" almeno un\'ora prima di coricarsi può fare una differenza significativa. Invece di scorrere feed infiniti, prova attività rilassanti come leggere un libro cartaceo, ascoltare musica dolce o dedicarti a esercizi di respirazione. Proteggere la tua melatonina è un investimento diretto nella qualità del tuo sonno, permettendo al tuo corpo di entrare naturalmente nelle fasi di riposo profondo e REM che la tua app analizza minuziosamente.',
    },
];

export const consigli: ConsiglioType[] = [
    {
        titolo: "Orario Fisso: Vai a letto e svegliati alla stessa ora ogni giorno per regolare il tuo orologio biologico",
    },
    {
        titolo: "Camera Fresca e Buia: Ottimizza l'ambiente della tua stanza per favorire il rilassamento notturno",
    },
    {
        titolo: "Stop Schermi: Evita l'uso di dispositivi elettronici almeno un'ora prima di dormire per proteggere la melatonina",
    },
    {
        titolo: "Cena Leggera: Non appesantirti con pasti abbondanti o troppo tardi la sera",
    },
    {
        titolo: "Movimento OK, Eccesso KO: Fai attività fisica regolarmente, ma evita allenamenti intensi vicino all'ora di andare a letto",
    },
    {
        titolo: "Rilassati Prima: Crea una routine serale distensiva, come leggere o fare un bagno caldo",
    },
];
