import "./fonts.css";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.tsx";
import Punteggio from "./components/Punteggio/Punteggio.tsx";
import PieGraph from "./components/PieGraph/PieGraph.tsx";
import Card from "./components/Card/Card.tsx";
import Consiglio from "./components/Consiglio/Consiglio.tsx";
import CreateScatterPlot from "./components/SleepStageChart/SleepStageChart.tsx";
import { extractData, SleepData } from "./scripts/extractData.ts";
import { useEffect, useState } from "react";
import {
    extractSleepStages,
    SleepStages,
} from "./scripts/extractSleepStages.ts";

function App() {
    const data = [
        { name: "Veglia", value: 3 },
        { name: "REM", value: 10 },
        { name: "Principale", value: 70 },
        { name: "Profondo", value: 17 },
    ];

    const COLORS = ["#FF8042", "lightskyblue", "royalblue", "blue"];

    // variabili per i dati
    const [sleepData, setSleepData] = useState<SleepData[] | null>(null);
    const [sleepStages, setSleepStages] = useState<SleepStages | null>(null);
    const [error, setError] = useState<string | null>(null);

    // variabili di loading
    const [loading, setLoading] = useState<boolean>(true);
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);
    const [stagesLoaded, setStagesLoaded] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await extractData(
                    "/public/4-sleep_data_2025-02-11.csv",
                );
                setSleepData(data);
                setDataLoaded(true);
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
                setStagesLoaded(true);
            } catch (err) {
                setError(
                    "Errore durante il calcolo dei dati degli stadi del sonno.",
                );
                console.error(err);
            }
        }
    }, [sleepData]); // fetch dei dati degli stadi del sonno

    useEffect(() => {
        if (dataLoaded && stagesLoaded) {
            setLoading(false);
        }
    }, [dataLoaded, stagesLoaded]); // controllo se i dati sono stati caricati

    useEffect(() => {
        if (!loading) {
            console.table(sleepData);
            console.table(sleepStages);
        }
    }, [loading]); // semplice stampa dei dati caricati ---- da togliere

    return (
        <div>
            {/* nel caso ci sia stato un errore nel caricare i dati, fa vedere l'errore */}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="riga1">
                <div className="carta">
                    <Card>
                        <Navbar></Navbar>
                    </Card>
                </div>
            </div>
            <div className="riga2">
                <div className="carta">
                    <Card>
                        <Punteggio></Punteggio>
                    </Card>
                </div>
            </div>
            <div className="riga3">
                <div className="mezzaCarta">
                    <Card>
                        <h1>HAI DORMITO</h1>
                        <div className="dormito">
                            <div className="grande">8</div>
                            <div>h</div>
                            <div className="vuoto"></div>
                            <div className="grande">20</div>
                            <div>min</div>
                        </div>
                    </Card>
                </div>
                <div className="bho"></div>
                <div className="mezzaCarta">
                    <Card>
                        <PieGraph colors={COLORS} data={data} />
                    </Card>
                </div>
            </div>
            <div className="riga4">
                <div className="carta big">
                    <Card>
                        <CreateScatterPlot />
                    </Card>
                </div>
            </div>
            <div className="riga2">
                <div className="carta">
                    <Card>
                        <Consiglio />
                    </Card>
                </div>
            </div>
            <div className="riga4">
                <div className="carta big">
                    <Card>
                        <h1>SEGNAPOSTO X GRAFICO</h1>
                    </Card>
                </div>
            </div>
            <div className="riga4">
                <div className="carta big">
                    <Card>
                        <h1>SEGNAPOSTO X INFORMAZIONI SUL SONNO</h1>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default App;
