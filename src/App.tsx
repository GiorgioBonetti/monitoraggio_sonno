import "./fonts.css";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.tsx";
import Punteggio from "./components/Punteggio/Punteggio.tsx";
import PieGraph from "./components/PieGraph/PieGraph.tsx";
import Card from "./components/Card/Card.tsx";
import Consiglio from "./components/Consiglio/Consiglio.tsx";
import CreateScatterPlot from "./components/SleepStageChart/SleepStageChart.tsx";
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

function App() {
    const COLORS = ["blue", "royalblue", "lightskyblue", "#FF8042"];
    const stageOrder = ["Deep", "Light", "REM", "Awake"];

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

    // variabili di loading - se false, i dati sono stati caricati
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(data.toISOString().split("T")[0]);
                const dati = await extractData(
                    `/4-sleep_data_${data.toISOString().split("T")[0]}.csv`,
                );
                setSleepData(dati);
            } catch (err) {
                console.log("Errore durante il caricamento dei dati dal csv.");
                console.error(err);
                setSleepData(null);
            }
        };

        fetchData();
    }, [data]); // fetch del csv

    useEffect(() => {
        if (sleepData) {
            try {
                setSleepStages(extractSleepStages(sleepData));

                setOreDormite(extractOreDormite(sleepData));

                setPunteggio(extractPunteggioSonno(sleepData));

                setoreNelLetto(extractOreLetto(sleepData));
            } catch (err) {
                console.log(
                    "Errore durante il calcolo dei dati degli stadi del sonno.",
                );
                console.error(err);
            }
        }
    }, [sleepData]); // fetch dei dati degli stadi del sonno

    useEffect(() => {
        if (sleepData != null && sleepStages != null) {
            setLoading(false);
        }
    }, [sleepData, sleepStages]); // controllo se i dati sono stati caricati

    useEffect(() => {
        if (!loading) {
            return;
        }
    }, [loading]); // semplice stampa dei dati caricati ---- da togliere

    return (
        <div className="bg-dark-subtle">
            <div className="container-fluid mb-1 fixed-top">
                <div className="row">
                    <div className="card bg-dark-subtle justify-content-center align-items-center border-0 border-bottom border-1 border-light rounded-0">
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
                    <div className="container-lg">
                        <div className="riga2 justify-content-center align-items-center row">
                            <div className="card text-center border-4 rounded-4">
                                <Card>
                                    <Punteggio
                                        punteggio={punteggio[0]}
                                        testo={punteggio[1]}
                                    ></Punteggio>
                                </Card>
                            </div>
                        </div>
                    </div>
                    <div className="container-lg">
                        <div className="riga3 row">
                            <div className="card col-12 col-md-6 border-4 rounded-4">
                                <Card>
                                    <div
                                        className="d-flex flex-column justify-content-center align-items-center"
                                        style={{ height: "100%" }}
                                    >
                                        {oreDormite.length === 2 && (
                                            <div>
                                                <h1 className="title align-middle">
                                                    HAI DORMITO
                                                </h1>
                                                <div className="row text-center align-middle">
                                                    <div className="dormito col-12">
                                                        <div className="grande mx-1 text-center">
                                                            {oreDormite[0]}
                                                        </div>
                                                        <div className="text-center">
                                                            h
                                                        </div>
                                                        <div className="grande mx-1 text-center">
                                                            {oreDormite[1]}
                                                        </div>
                                                        <div className="text-center">
                                                            min
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {oreNelLetto.length === 2 && (
                                            <div>
                                                <h1 className="title align-middle">
                                                    sei stato nel letto
                                                </h1>
                                                <div className="row text-center align-middle">
                                                    <div className="dormito col-12">
                                                        <div className="grande mx-1 text-center">
                                                            {oreNelLetto[0]}
                                                        </div>
                                                        <div className="text-center">
                                                            h
                                                        </div>
                                                        <div className="grande mx-1 text-center">
                                                            {oreNelLetto[1]}
                                                        </div>
                                                        <div className="text-center">
                                                            min
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            </div>
                            <div className="card col-12 col-md-6 border-4 rounded-4">
                                <div className="text-center justify-content-center align-items-center ">
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
                    <div className="container-lg">
                        <div className="riga4 justify-content-center align-items-center row">
                            <div className="card border-4 rounded-4">
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
                    <div className="container-lg">
                        <div className="riga2 justify-content-center align-items-center row">
                            <div className="big card border-4 rounded-4">
                                <Card>
                                    <Consiglio />
                                </Card>
                            </div>
                        </div>
                    </div>
                    <div className="container-lg">
                        <div className="riga4 justify-content-center align-items-center row">
                            <div className="big card border-4 rounded-4">
                                <Card>
                                    <h1>SEGNAPOSTO X GRAFICO</h1>
                                </Card>
                            </div>
                        </div>
                    </div>
                    <div className="container-lg">
                        <div className="riga4 justify-content-center align-items-center row">
                            <div className="card border-4 rounded-4">
                                <Card>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col">
                                                <div className="card rounded-4">
                                                    <Card>
                                                        <div className="row">
                                                            <div className="col-10">
                                                                <h2>
                                                                    Reset Sonno: Sincronizza il Tuo Orario
                                                                </h2>
                                                            </div>
                                                            <div className="col">
                                                                <ButtonArticolo target="1" />
                                                            </div>
                                                            <Articolo target="1">
                                                                <p>
                                                                    Stabilire una routine di sonno regolare è come accordare uno strumento musicale: quando ogni parte è in sintonia, l'armonia che ne deriva è palpabile. Andare a letto e svegliarsi alla stessa ora ogni giorno, fine settimana inclusi, rafforza il tuo orologio biologico interno, il direttore d'orchestra del tuo ciclo sonno-veglia. Questa coerenza segnala al tuo corpo quando è il momento di rilassarsi e prepararsi per il riposo e quando è il momento di attivarsi. Un ritmo circadiano ben regolato non solo facilita l'addormentamento e un risveglio più agevole, ma contribuisce anche a una maggiore stabilità delle fasi del sonno, migliorando significativamente la durata e la qualità complessiva del tuo riposo notturno, come la tua app ben evidenzia attraverso i grafici dettagliati.                                                                </p>
                                                            </Articolo>
                                                        </div>
                                                    </Card>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="container">
                                        <div className="row">
                                            <div className="col">
                                                <div className="card rounded-4">
                                                    <Card>
                                                        <div className="row">
                                                            <div className="col-10">
                                                                <h2>
                                                                    Termo-Relax: Ottimizza la Temperatura per un Sonno Profondo
                                                                </h2>
                                                            </div>
                                                            <div className="col">
                                                                <ButtonArticolo target="2" />
                                                            </div>
                                                            <Articolo target="2">
                                                                <p>
                                                                La temperatura della tua camera da letto gioca un ruolo cruciale nella qualità del tuo sonno. Immagina di avvolgerti in un fresco abbraccio anziché lottare contro un ambiente surriscaldato. Idealmente, la temperatura dovrebbe mantenersi tra i 18 e i 22 gradi Celsius. Questo intervallo favorisce un abbassamento della temperatura corporea interna, un processo naturale che precede l'addormentamento. Una stanza troppo calda può ostacolare questo processo, rendendo il sonno più leggero e frammentato. Considera di utilizzare lenzuola traspiranti, regolare il termostato o aprire una finestra per creare la tua personale "oasi di freschezza", un ambiente che inviti al riposo profondo e rigenerante che la tua app saprà quantificare in termini di miglioramento delle fasi di sonno profondo.                                                                </p>
                                                            </Articolo>
                                                        </div>
                                                    </Card>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div >
            ) : (
                <div
                    style={{ minHeight: "100vh" }}
                    className="d-flex justify-content-center"
                >
                    <div className="container-lg">
                        <div className=" justify-content-center align-items-center row">
                            <div className="card text-center border-4 rounded-4">
                                <Card>
                                    <h1>Nessun dato presente</h1>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    );
}

export default App;
