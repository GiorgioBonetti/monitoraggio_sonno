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

function App() {
    const COLORS = ["#FF8042", "lightskyblue", "royalblue", "blue"];
    const [testo] = useState("Eccellente");
    const [percentuale] = useState(100);

    // variabili per i dati
    const [sleepData, setSleepData] = useState<SleepDataInterface[] | null>(
        null,
    );
    const [sleepStages, setSleepStages] = useState<SleepStageType[] | null>(
        null,
    );
    const [error, setError] = useState<string | null>(null);

    // variabili di loading - se false, i dati sono stati caricati
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await extractData("/4-sleep_data_2025-02-11.csv");
                setSleepData(data);
            } catch (err) {
                setError("Errore durante il caricamento dei dati dal csv.");
                console.error(err);
            }
        };

        fetchData();
    }, []); // fetch del csv

    useEffect(() => {
        if (sleepData) {
            try {
                const stages = extractSleepStages(sleepData);
                setSleepStages(stages);
            } catch (err) {
                setError(
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
            console.table(sleepData);
            console.table(sleepStages);
        }
    }, [loading]); // semplice stampa dei dati caricati ---- da togliere

    return (
        <div className="bg-dark-subtle">
            {/* nel caso ci sia stato un errore nel caricare i dati, fa vedere l'errore */}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="container-fluid mb-1 fixed-top">
                <div className="row">
                    <div className="card bg-dark-subtle justify-content-center align-items-center border-0 border-bottom border-1 border-light rounded-0">
                        <Card>
                            <Navbar></Navbar>
                        </Card>
                    </div>
                </div>
            </div>
            {/* Spacer per evitare sovrapposizione */}
            <div className="pt-5 mt-4"></div>
            <div className="container-lg">
                <div className="riga2 justify-content-center align-items-center row">
                    <div className="card text-center border-4 rounded-4">
                        <Card>
                            <Punteggio
                                punteggio={percentuale}
                                testo={testo}
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
                                <h1 className="title align-middle">
                                    HAI DORMITO
                                </h1>
                                <div className="row text-center  align-middle">
                                    <div className="dormito col-12">
                                        <div className="grande mx-1 text-center">
                                            8
                                        </div>
                                        <div className="text-center">h</div>
                                        <div className="grande mx-1 text-center">
                                            20
                                        </div>
                                        <div className="text-center">min</div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="card col-12 col-md-6 border-4 rounded-4">
                        <div className="text-center justify-content-center align-items-center ">
                            <Card>
                                <PieGraph
                                    data={sleepStages ? sleepStages : []}
                                    colors={COLORS}
                                />
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-lg">
                <div className="riga4 justify-content-center align-items-center row">
                    <div className="big card border-4 rounded-4">
                        <Card>
                            <CreateScatterPlot
                                dati={sleepData ? sleepData : []}
                                colors={COLORS}
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
                    <div className="big card border-4 rounded-4">
                        <Card>
                            <h1>SEGNAPOSTO X INFORMAZIONI SUL SONNO</h1>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
