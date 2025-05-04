import "./fonts.css";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.tsx";
import Punteggio from "./components/Punteggio/Punteggio.tsx";
import PieGraph from "./components/Chart/PieGraph/PieGraph.tsx";
import Card from "./components/Card/Card.tsx";
import Consiglio from "./components/Consiglio/Consiglio.tsx";
import CreateScatterPlot from "./components/Chart/SleepStageChart/SleepStageChart.tsx";
import { extractData, SleepDataInterface } from "./scripts/extractData.ts";
import { useEffect, useState } from "react";
import {
    extractSleepStages,
    SleepStageType,
} from "./scripts/extractSleepStages.ts";
import { extractOreDormite, extractOreLetto } from "./scripts/totOreDormite.ts";
import { extractPunteggioSonno } from "./scripts/calcolaPunteggio.ts";
import Articolo from "./components/Articolo/Articolo.tsx";
import ButtonArticolo from "./components/Articolo/button/ButtonArticolo.tsx";
import CreateStackedColumnPlot from "./components/Chart/BarChart/StackedColumnPlot.tsx";

type ArticoloType = {
    target: string;
    titolo: string;
    testo: string;
};

export type ConsiglioType = {
    titolo: string;
};

function App() {
    const COLORS = ["blue", "royalblue", "lightskyblue", "#FF8042"];
    const stageOrder = ["Deep", "Light", "REM", "Awake"];

    const articoli: ArticoloType[] = [
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

    const consigli: ConsiglioType[] = [
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

    // variabili per i dati
    const [sleepData, setSleepData] = useState<SleepDataInterface[] | null>(
        null,
    );
    const [sleepStages, setSleepStages] = useState<SleepStageType[] | null>(
        null,
    );
    const [oreDormite, setOreDormite] = useState<string[]>([]);
    const [oreNelLetto, setoreNelLetto] = useState<string[]>([]);

    const [punteggio, setPunteggio] = useState<[number, string]>([0, ""]);
    const [data, setData] = useState<Date>(new Date());

    const [settMese, setsettMese] = useState<boolean>(false);

    const [sleepDataWeek, setSleepDataWeek] = useState<
        SleepDataInterface[][] | null
    >(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dati = await extractData(
                    `/4-sleep_data_${data.toISOString().split("T")[0]}.csv`,
                );
                setSleepData(dati);

                if (settMese) {
                    const datiSettimana = [dati];
                    for (let i = 1; i <= 6; i++) {
                        const datiGiorno = await extractData(
                            `/4-sleep_data_${new Date(data.getTime() - i * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}.csv`,
                        ).catch(() => []);
                        datiSettimana.push(datiGiorno);
                    }
                    setSleepDataWeek(datiSettimana);
                } else {
                    const datiSettimana = [dati];
                    for (let i = 1; i <= 30; i++) {
                        const datiGiorno = await extractData(
                            `/4-sleep_data_${new Date(data.getTime() - i * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}.csv`,
                        ).catch(() => []);
                        datiSettimana.push(datiGiorno);
                    }
                    setSleepDataWeek(datiSettimana);
                }
            } catch (err) {
                console.error(
                    "Errore durante il fetch dei dati. Potrebbero essere mancanti, oppure errati.\n\n",
                    err,
                );
                setSleepData(null);
            }
        };

        fetchData().then(() => {});
    }, [data]); // fetch del csv

    useEffect(() => {
        if (sleepData != null) {
            try {
                setSleepStages(extractSleepStages(sleepData));

                setOreDormite(extractOreDormite(sleepData));

                setPunteggio(extractPunteggioSonno(sleepData));

                setoreNelLetto(extractOreLetto(sleepData));
            } catch (err) {
                // errore sicuramente gia' stampato dal catch dello useEffect precedente
            }
        }
    }, [sleepData]); // fetch dei dati degli stadi del sonno

    return (
        <div className="bg-dark-subtle">
            {/* Navbar */}
            <div className="container-fluid mb-1 fixed-top">
                <div className="row">
                    <div className="card bg-dark-subtle align-items-center border-0 border-bottom border-1 border-light rounded-0">
                        <Card>
                            <Navbar
                                currentDate={data || new Date()}
                                setCurrentDate={setData}
                            ></Navbar>
                        </Card>
                    </div>
                </div>
            </div>

            {/*Spacer tra il navbar e i componenti della pagina. Quando non ci sono dati, viene nascosto. */}
            <div
                className="pt-5 mt-4"
                style={{
                    visibility:
                        sleepData && sleepData.length > 0
                            ? "visible"
                            : "hidden",
                }}
            ></div>

            {sleepData && sleepData.length > 0 ? (
                <div>
                    {/* Titolo */}
                    <div className="container-lg">
                        <div className="row">
                            <div className="card border-4 rounded-4">
                                <Card>
                                    <Punteggio
                                        punteggio={punteggio[0]}
                                        testo={punteggio[1]}
                                    ></Punteggio>
                                </Card>
                            </div>
                        </div>
                    </div>
                    {/* Scritta 'hai dormito' */}
                    <div className="container-lg">
                        <div className="row">
                            <div className="card col-12 col-md-6 border-4 rounded-4">
                                <Card>
                                    <div
                                        className="d-flex flex-column justify-content-center align-items-center"
                                        style={{ height: "100%" }}
                                    >
                                        {oreDormite.length === 2 && (
                                            <div>
                                                <h1 className="title">
                                                    Hai dormito
                                                </h1>
                                                <div className="row">
                                                    <div className="dormito col-12">
                                                        <div className="grande mx-1">
                                                            {oreDormite[0]}
                                                        </div>
                                                        <div>h</div>
                                                        <div className="grande mx-1">
                                                            {oreDormite[1]}
                                                        </div>
                                                        <div>min</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {/* spacer tra i due orari */}
                                        <div className="pt-5"></div>
                                        {oreNelLetto.length === 2 && (
                                            <div>
                                                <h1 className="title">
                                                    Sei stato nel letto
                                                </h1>
                                                <div className="row">
                                                    <div className="dormito col-12 px-5">
                                                        <div className="grande">
                                                            {oreNelLetto[0]}
                                                        </div>
                                                        <div>h</div>
                                                        <div className="grande">
                                                            {oreNelLetto[1]}
                                                        </div>
                                                        <div>min</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            </div>
                            {/* Grafico a torta */}
                            <div className="card col-12 col-md-6 border-4 rounded-4">
                                <div className="pt-1">
                                    <Card>
                                        <PieGraph
                                            data={
                                                sleepStages ? sleepStages : []
                                            }
                                            colors={COLORS}
                                            ordine={stageOrder}
                                        />
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Grafico a dispersione */}
                    <div className="container-lg">
                        <div className="row">
                            <div className="card border-4 rounded-4 py-1 px-2">
                                <Card>
                                    <CreateScatterPlot
                                        dati={sleepData}
                                        colors={COLORS}
                                        ordine={stageOrder}
                                    />
                                </Card>
                            </div>
                        </div>
                    </div>
                    {/* Consiglio */}
                    <div className="container-lg">
                        <div className="row">
                            <div className="card border-4 rounded-4 py-1">
                                <Card>
                                    <h1>Consigli</h1>
                                    <div>
                                        <Consiglio
                                            articolo={
                                                consigli[
                                                    Math.floor(
                                                        Math.random() *
                                                            consigli.length,
                                                    )
                                                ]
                                            }
                                        />
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                    {/* Grafico a barre */}
                    <div className="container-lg">
                        <div className="row">
                            <div className="card border-4 rounded-4">
                                <Card>
                                    <div className="row px-5 mt-2 mb-4">
                                        <div className="col col-sm-6 col-12 my-2 my-sm-0 mx-sm-0 mx-2">
                                            <button
                                                onClick={() =>
                                                    setsettMese(true)
                                                }
                                                className="btn px-4"
                                                style={{
                                                    backgroundColor: "#14bdad",
                                                    color: "white",
                                                    transition: "all 0.2s ease",
                                                }}
                                                onMouseDown={(e) => {
                                                    e.currentTarget.style.boxShadow =
                                                        "0 4px 8px rgba(0, 0, 0, 0.3)";
                                                    e.currentTarget.style.transform =
                                                        "scale(0.95)";
                                                }}
                                                onMouseUp={(e) => {
                                                    e.currentTarget.style.boxShadow =
                                                        "none";
                                                    e.currentTarget.style.transform =
                                                        "scale(1)";
                                                }}
                                            >
                                                SETTIMANA
                                            </button>
                                        </div>
                                        <div className="col col-sm-6 col-12 my-2 my-sm-0 mx-sm-0 mx-2">
                                            <button
                                                onClick={() =>
                                                    setsettMese(false)
                                                }
                                                className="btn px-5"
                                                style={{
                                                    backgroundColor: "#14bdad",
                                                    color: "white",
                                                    transition: "all 0.2s ease",
                                                }}
                                                onMouseDown={(e) => {
                                                    e.currentTarget.style.boxShadow =
                                                        "0 4px 8px rgba(0, 0, 0, 0.3)";
                                                    e.currentTarget.style.transform =
                                                        "scale(0.95)";
                                                }}
                                                onMouseUp={(e) => {
                                                    e.currentTarget.style.boxShadow =
                                                        "none";
                                                    e.currentTarget.style.transform =
                                                        "scale(1)";
                                                }}
                                            >
                                                MESE
                                            </button>
                                        </div>
                                    </div>
                                    <CreateStackedColumnPlot
                                        dati={sleepDataWeek || []}
                                        colors={COLORS}
                                        ordine={stageOrder}
                                        settMese={settMese}
                                    />
                                </Card>
                            </div>
                        </div>
                    </div>
                    {/* Articoli */}
                    <div className="container-lg">
                        <div className="row">
                            <div className="card border-4 rounded-4">
                                <Card>
                                    <h1 className="py-1">Articoli</h1>
                                    {articoli.map((articolo) => (
                                        <div
                                            key={articolo.target}
                                            className="container my-3"
                                        >
                                            <div className="card border-4 rounded-4">
                                                <Card>
                                                    <div className="text-start row">
                                                        <h2 className="col-10 col-md-10 col-sm-9">
                                                            {articolo.titolo}
                                                        </h2>
                                                        <div className="col-1 offset-0 offset-sm-1">
                                                            <ButtonArticolo
                                                                target={
                                                                    articolo.target
                                                                }
                                                            />
                                                        </div>
                                                        <Articolo
                                                            target={
                                                                articolo.target
                                                            }
                                                        >
                                                            <p className="pt-2">
                                                                <small>
                                                                    {
                                                                        articolo.testo
                                                                    }
                                                                </small>
                                                            </p>
                                                        </Articolo>
                                                    </div>
                                                </Card>
                                            </div>
                                        </div>
                                    ))}
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // Se non ci sono dati, mostra un messaggio
                <div
                    style={{
                        minHeight:
                            "100vh" /* necessario per espandere il bg a tutta la pagina */,
                    }}
                >
                    <div className="container-lg">
                        <div className="row">
                            <div className="card text-center border-4 rounded-4">
                                <Card>
                                    <h1>Nessun dato presente</h1>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
