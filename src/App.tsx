import "./fonts.css";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.tsx";
import Punteggio from "./components/Punteggio/Punteggio.tsx";
import PieGraph from "./components/PieGraph/PieGraph.tsx";
import Card from "./components/Card/Card.tsx";
import Consiglio from "./components/Consiglio/Consiglio.tsx";
import CreateScatterPlot from "./components/SleepStageChart/SleepStageChart.tsx";

function App() {
    const data = [
        { name: "Veglia", value: 3 },
        { name: "REM", value: 10 },
        { name: "Principale", value: 70 },
        { name: "Profondo", value: 17 },
    ];


    const COLORS = ["#FF8042", "lightskyblue", "royalblue", "blue"];

    return (
        <div>
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
                        <CreateScatterPlot/>
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
