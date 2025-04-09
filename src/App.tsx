import "./App.css";
import Navbar from "./components/Navbar/Navbar.tsx";
import Punteggio from "./components/Punteggio/Punteggio.tsx";
import PieGraph from "./components/PieGraph/PieGraph.tsx";
import Card from "./components/Card/Card.tsx";

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
            <Navbar></Navbar>
            <div className="riga2">
                <Punteggio></Punteggio>
            </div>
            <div className="riga3">
                <div className="carta">
                    <Card>
                        <h1>HAI DORMITO</h1>
                        <div className="dormito">
                            <div className="grande">8 </div>
                            <div>h</div>
                            <div className="vuoto"></div>
                            <div className="grande">20</div>
                            <div>min</div>
                        </div>

                    </Card>
                </div>
                <div className="carta">
                    <Card>
                        <PieGraph colors={COLORS} data={data} />
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default App;
