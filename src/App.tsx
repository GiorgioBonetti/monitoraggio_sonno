import "./fonts.css";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.tsx";
import Punteggio from "./components/Punteggio/Punteggio.tsx";
import PieGraph from "./components/Chart/PieGraph/PieGraph.tsx";
import Card from "./components/Card/Card.tsx";
import Consiglio from "./components/Consiglio/Consiglio.tsx";
import CreateScatterPlot from "./components/Chart/SleepStageChart/SleepStageChart.tsx";
import { SleepDataInterface } from "./scripts/extractData.ts";
import { useEffect, useState } from "react";
import {
    extractSleepStages,
    SleepStageType,
} from "./scripts/extractSleepStages.ts";
import { extractOreDormite, extractOreLetto } from "./scripts/totOreDormite.ts";
import { extractPunteggioSonno } from "./scripts/calcolaPunteggio.ts";
import TempoDormito from "./components/TempoDormito/TempoDormito.tsx";
import GraficoBarre from "./components/GraficoBarre/GraficoBarre.tsx";
import Articoli from "./components/Articoli/Articoli.tsx";
import MissingData from "./components/MissingData/MissingData.tsx";
import {
    articoli,
    consigli,
    ConsiglioType,
} from "./scripts/dataConsigliArticoli.ts";
import { useNavigate } from "react-router-dom";
import { useUser } from "./contesto/UserContext";
import supabase from "../Supabase.ts";

function App() {
    const { user } = useUser();

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
    const [consiglioSelected, setConsiglioSelected] = useState<ConsiglioType>();

    const [punteggio, setPunteggio] = useState<[number, string]>([0, ""]);
    const [data, setData] = useState<Date>(new Date());

    const [settMese, setsettMese] = useState<boolean>(true);

    const [sleepDataWeek, setSleepDataWeek] = useState<
        SleepDataInterface[][] | null
    >(null);

    const navigate = useNavigate();

    // use effect
    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const { data: datiGiorno, error } = await supabase
                        .from("dati")
                        .select("Sleep, Timestamp")
                        .eq("FkUtente", user?.id)
                        .eq(
                            "night_reference",
                            data.toISOString().split("T")[0],
                        );

                    if (datiGiorno) {
                        setSleepData(
                            datiGiorno.map((d) => ({
                                date: d.Timestamp.split("T")[0],
                                timestamp: d.Timestamp.split("T")[1],
                                stage: d.Sleep,
                            })),
                        );
                    }
                    if (error) {
                        setSleepData([]);
                    }

                    const max = settMese ? 6 : 30;

                    const datiSettimana = [];

                    for (let i = 0; i <= max; i++) {
                        const { data: dati } = await supabase
                            .from("dati")
                            .select("Sleep, Timestamp")
                            .eq("FkUtente", user?.id)
                            .eq(
                                "night_reference",
                                new Date(
                                    data.getTime() - i * 24 * 60 * 60 * 1000,
                                )
                                    .toISOString()
                                    .split("T")[0],
                            );

                        if (dati) {
                            datiSettimana.push(
                                dati.map((d) => ({
                                    timestamp: d.Timestamp.split("T")[1],
                                    date: d.Timestamp.split("T")[0],
                                    stage: d.Sleep,
                                })),
                            );
                        }
                    }
                    setSleepDataWeek(datiSettimana as SleepDataInterface[][]);
                } catch {
                    setSleepData(null);
                }
            };

            fetchData().then(() => {});
        }
    }, [data, settMese]); // fetch del csv

    useEffect(() => {
        const interval = setInterval(() => {
            setConsiglioSelected(
                consigli[Math.floor(Math.random() * consigli.length)],
            );
        }, 20000);

        return () => clearInterval(interval);
    }, [consiglioSelected]); // change del consiglio ogni 20 secondi

    useEffect(() => {
        if (user === null) {
            navigate("/login");
        }
    }, []); // reindirizza alla pagina di login se non c'è un utente loggato

    useEffect(() => {
        if (sleepData != null) {
            setSleepStages(extractSleepStages(sleepData));

            setOreDormite(extractOreDormite(sleepData));

            setPunteggio(extractPunteggioSonno(sleepData));

            setoreNelLetto(extractOreLetto(sleepData));
        }
    }, [sleepData]); // fetch dei dati degli stadi del sonno ogni volta che cambia la data

    return user == null ? (
        <div></div>
    ) : (
        <div>
            {/* Navbar */}
            <Navbar
                currentDate={data || new Date()}
                setCurrentDate={setData}
            ></Navbar>

            {sleepData && sleepData.length > 0 ? ( // Se ci sono dati, mostra i componenti
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
                    <div className="container-lg">
                        <div className="row">
                            {/* Scritta 'hai dormito' */}
                            <div className="card col-12 col-md-6 border-4 rounded-4">
                                <Card>
                                    <TempoDormito
                                        oreDormite={oreDormite}
                                        oreNelLetto={oreNelLetto}
                                        sleepData={sleepData}
                                    />
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
                    {/* Consiglio */}
                    <div className="container-lg">
                        <div className="row">
                            <div className="card border-4 rounded-4">
                                <Card>
                                    <Consiglio
                                        articolo={
                                            consiglioSelected
                                                ? consiglioSelected
                                                : consigli[0]
                                        }
                                    />
                                </Card>
                            </div>
                        </div>
                    </div>
                    {/* Grafico a barre */}
                    <div className="container-lg">
                        <div className="row">
                            <div className="card border-4 rounded-4">
                                <Card>
                                    <GraficoBarre
                                        sleepDataWeek={sleepDataWeek || []}
                                        colors={COLORS}
                                        stageOrder={stageOrder}
                                        settMese={settMese}
                                        setSettMese={setsettMese}
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
                                    <Articoli articoli={articoli} />
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
                        <div className="row text-center">
                            <div className="card border-4 rounded-4">
                                <Card>
                                    <MissingData />
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
